import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from 'src/schemas/Image.schema';
import { Location } from 'src/schemas/Location.schema';
import { executeCommand, validLocationsNames } from 'src/utils';
import { GetImagesDto } from './dtos/GetImages.dto';
import { VmSize } from 'src/schemas/VmSize.schema';
import { filter, includes, isEmpty, reduce, sort, whereEq } from 'ramda';
import { GetVmSizesDto } from './dtos/GetVmSizes.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AzureService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @InjectModel(Image.name) private imageModel: Model<Image>,
    @InjectModel(VmSize.name) private vmSizeModel: Model<VmSize>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  // =========================== LOCATIONS  ===============================

  async loadLocationsToDB() {
    const locationsData = executeCommand(
      'az account list-locations --output json',
    );
    const locations = JSON.parse(locationsData);

    const validLocations = filter(
      (location: any) => includes(location.name, validLocationsNames),
      locations,
    );

    // delete all locations if exists:
    await this.locationModel.deleteMany({});
    // inset new locations:
    const savedLocations = await this.locationModel.insertMany(validLocations);
    // setting locations to cache
    await this.cacheManager.set('azure-locations', savedLocations);

    return savedLocations;
  }

  async getAllLocations() {
    const locationsCache: Array<any> =
      await this.cacheManager.get('azure-locations');
    if (locationsCache) {
      return locationsCache;
    }
    const locations = await this.locationModel.find();
    await this.cacheManager.set('azure-locations', locations);
    return locations;
  }

  async getAllLocationsNames() {
    let locations: Array<any> = await this.cacheManager.get('azure-locations');
    if (!locations) locations = await this.locationModel.find();

    const locationNames = reduce(
      (acc: Array<any>, location: any) => [...acc, location.displayName],
      [],
    )(locations);

    const diff = function (a: any, b: any) {
      return a - b;
    };
    return sort(diff, locationNames);
  }

  async getLocationByName(name: string) {
    const locationCache = await this.cacheManager.get(
      `azure-locations-${name}`,
    );

    if (locationCache) return locationCache;

    const location = await this.locationModel.findOne({ name });
    await this.cacheManager.set(`azure-locations-${name}`, location);
    return location;
  }

  // ============================ IMAGES  ===============================

  async loadImagesToDB() {
    const imagesData = executeCommand('az vm image list --output json');
    const images = JSON.parse(imagesData);
    // delete all images if exists:
    await this.imageModel.deleteMany({});
    // inset new images:
    const savedImages = await this.imageModel.insertMany(images);
    // setting locations to cache
    await this.cacheManager.set('azure-images', savedImages);
    return savedImages;
  }

  async getAllImages(query: GetImagesDto) {
    const imagesCache = await this.cacheManager.get('azure-images');
    if (imagesCache && isEmpty(query)) return imagesCache;
    const images = await this.imageModel.find(query);
    if (isEmpty(query)) await this.cacheManager.set('azure-images', images);
    return images;
  }

  async getImageByUrn(urn: string) {
    const imageByUrnCache = await this.cacheManager.get(`azure-images-${urn}`);
    if (imageByUrnCache) return imageByUrnCache;
    const image = await this.imageModel.findOne({ urn });
    await this.cacheManager.set(`azure-images-${urn}`, image);
    return image;
  }

  // ========================= vm-sizes ======================================

  async loadVmSizesToDB() {
    const locations = await this.locationModel.find();

    const getLocalVmSizes = (local: string) =>
      executeCommand(`az vm list-sizes --location ${local} --output json`);

    const promises = reduce(
      (acc: Array<any>, location: any) => [
        ...acc,
        getLocalVmSizes(location.name),
      ],
      [],
      locations,
    );

    const azureResultForAllLocations = await Promise.all(promises);

    const formatedResult = locations.map((location: any, index) => {
      return {
        location: location.name,
        options: JSON.parse(azureResultForAllLocations[index]),
      };
    });

    // delete all locations if exists
    await this.vmSizeModel.deleteMany({});
    // inset new locations
    const savedVmSizes = await this.vmSizeModel.insertMany(formatedResult);
    // setting vm-sizes to cache
    await this.cacheManager.set('azure-vm-sizes', savedVmSizes);

    return savedVmSizes;
  }

  async getAllVmSizes() {
    const vmSizesCache = await this.cacheManager.get('azure-vm-sizes');
    if (vmSizesCache) return vmSizesCache;
    const vmSizes = await this.vmSizeModel.find();
    // setting vm-sizes to cache
    await this.cacheManager.set('azure-vm-sizes', vmSizes);
    return vmSizes;
  }

  async getVmSizesByLocation(locationName: string, query: GetVmSizesDto) {
    const vmSizeCache = await this.cacheManager.get(
      `azure-vm-sizes-${locationName}`,
    );
    if (vmSizeCache && isEmpty(query)) return vmSizeCache;

    const localVmSizes = await this.vmSizeModel.findOne({
      location: locationName,
    });

    const localVmSizesOptionsFiltered = filter(
      (option: any) => whereEq(query)(option),
      localVmSizes.options,
    );

    if (isEmpty(query))
      await this.cacheManager.set(
        `azure-vm-sizes-${locationName}`,
        localVmSizes,
      );

    return { location: locationName, options: localVmSizesOptionsFiltered };
  }

  async getLocationOptions(locationName: string) {
    let vmSizeCache = await this.cacheManager.get(
      `azure-vm-sizes-${locationName}`,
    );

    if (!vmSizeCache) {
      const localVmSizes = await this.vmSizeModel.findOne({
        location: locationName,
      });
      await this.cacheManager.set(
        `azure-vm-sizes-${locationName}`,
        localVmSizes,
      );
      vmSizeCache = localVmSizes;
    }

    const maxDataDiskCountOptions = new Set();
    const memoryInMBOptions = new Set();
    const numberOfCoresOptions = new Set();
    const osDiskSizeInMBOptions = new Set();
    const resourceDiskSizeInMBOptions = new Set();

    // @ts-expect-error: Unreachable code error
    vmSizeCache.options.forEach((option: any) => {
      maxDataDiskCountOptions.add(option.maxDataDiskCount.toString());
      memoryInMBOptions.add(option.memoryInMB.toString());
      numberOfCoresOptions.add(option.numberOfCores.toString());
      osDiskSizeInMBOptions.add(option.osDiskSizeInMB.toString());
      resourceDiskSizeInMBOptions.add(option.resourceDiskSizeInMB.toString());
    });

    const diff = function (a: any, b: any) {
      return a - b;
    };

    const options = {
      maxDataDiskCount: sort(diff, Array.from(maxDataDiskCountOptions)),
      memoryInMB: sort(diff, Array.from(memoryInMBOptions)),
      numberOfCores: sort(diff, Array.from(numberOfCoresOptions)),
      osDiskSizeInMB: sort(diff, Array.from(osDiskSizeInMBOptions)),
      resourceDiskSizeInMB: sort(diff, Array.from(resourceDiskSizeInMBOptions)),
    };

    return { options };
  }
}
