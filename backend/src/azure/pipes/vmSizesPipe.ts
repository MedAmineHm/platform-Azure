import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class VmSizesPipe implements PipeTransform {
  transform(options: any) {
    const {
      maxDataDiskCount,
      memoryInMB,
      name,
      numberOfCores,
      osDiskSizeInMB,
      resourceDiskSizeInMB,
    } = options;

    const optionsProcessed = {
      ...(maxDataDiskCount && { maxDataDiskCount: parseInt(maxDataDiskCount) }),
      ...(memoryInMB && { memoryInMB: parseInt(memoryInMB) }),
      ...(name && { name: name }),
      ...(numberOfCores && { numberOfCores: parseInt(numberOfCores) }),
      ...(osDiskSizeInMB && { osDiskSizeInMB: parseInt(osDiskSizeInMB) }),
      ...(resourceDiskSizeInMB && {
        resourceDiskSizeInMB: parseInt(resourceDiskSizeInMB),
      }),
    };

    return optionsProcessed;
  }
}
