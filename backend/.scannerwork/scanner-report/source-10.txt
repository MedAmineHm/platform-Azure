import {
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AzureService } from './azure.service';
import { GetImagesDto } from './dtos/GetImages.dto';
import { GetVmSizesDto } from './dtos/GetVmSizes.dto';
import { VmSizesPipe } from './pipes/vmSizesPipe';

@Controller('azure')
export class AzureController {
  constructor(private readonly azureService: AzureService) {}

  // ===========================  LOCATIONS  ===============================

  // POST: /azure/locations/refresh
  @Post('locations/refresh')
  // @UseGuards(AuthGuard('jwt'))
  async refreshLocationToDB() {
    try {
      const locationsData = await this.azureService.loadLocationsToDB();
      return { success: true, data: locationsData };
    } catch (e) {
      console.log(e);
      throw new HttpException('An error has occurred.', 422);
    }
  }

  // GET: /azure/locations
  @Get('locations')
  // @UseGuards(AuthGuard('jwt'))
  async getAllLocations() {
    try {
      const locationsData = await this.azureService.getAllLocations();
      return { success: true, data: locationsData };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occurred.', 401);
    }
  }

  // GET: /azure/locations/names
  @Get('locations/names')
  // @UseGuards(AuthGuard('jwt'))
  async getAllNames() {
    try {
      const locationsNamesData = await this.azureService.getAllLocationsNames();
      return { success: true, data: locationsNamesData };
    } catch (e) {
      console.log(e);
      throw new HttpException('An error has occurred', 404);
    }
  }

  // GET: /azure/locations
  @Get('locations/:name')
  // @UseGuards(AuthGuard('jwt'))
  async getLocationByName(@Param('name') name: string) {
    try {
      const locationData = await this.azureService.getLocationByName(name);
      if (!locationData) throw new Error('Location not found!');
      return { success: true, data: locationData };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occurred.', 401);
    }
  }

  // ============================  IMAGES  =================================

  // POST: /azure/images/refresh
  @Post('images/refresh')
  // @UseGuards(AuthGuard('jwt'))
  async refreshImagesToDB() {
    try {
      const imagesData = await this.azureService.loadImagesToDB();
      return { success: true, data: imagesData };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occurred.', 401);
    }
  }

  // GET: /azure/images
  @Get('images')
  // @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async getAllImages(@Query() query: GetImagesDto) {
    try {
      const imagesData = await this.azureService.getAllImages(query);
      return { success: true, data: imagesData };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occurred.', 401);
    }
  }

  // GET: /azure/images/:urn
  @Get('images/:urn')
  // @UseGuards(AuthGuard('jwt'))
  async getImageByUrn(@Param('urn') urn: string) {
    try {
      const imageData = await this.azureService.getImageByUrn(urn);
      if (!imageData) throw new Error('Image not found');
      return { success: true, data: imageData };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occurred.', 401);
    }
  }

  // ============================== VM Sizes ==================================

  // POST: /azure/vm-sizes/refresh
  @Post('vm-sizes/refresh')
  // @UseGuards(AuthGuard('jwt'))
  async refreshVmSizesToDB() {
    try {
      const vmSizes = await this.azureService.loadVmSizesToDB();
      return { success: true, data: vmSizes };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occurred.', 401);
    }
  }

  // GET: /azure/vm-sizes
  @Get('vm-sizes')
  // @UseGuards(AuthGuard('jwt'))
  async getAllVmSizes() {
    try {
      const vmSizesFull = await this.azureService.getAllVmSizes();
      return { success: true, data: vmSizesFull };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occurred.', 401);
    }
  }

  @Get('vm-sizes/:locationName')
  // @UseGuards(AuthGuard('jwt'))
  async getVmSizesByLocation(
    @Param('locationName') locationName: string,
    @Query(VmSizesPipe) query: GetVmSizesDto,
  ) {
    try {
      const vmSizes = await this.azureService.getVmSizesByLocation(
        locationName,
        query,
      );
      return { success: true, data: vmSizes };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occurred', 401);
    }
  }

  @Get('vm-sizes/:locationName/options')
  // @UseGuards(AuthGuard('jwt'))
  async getLocalVmSizesOptions(@Param('locationName') locationName: string) {
    try {
      const options = await this.azureService.getLocationOptions(locationName);
      return { success: true, data: options };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occurred', 401);
    }
  }
}
