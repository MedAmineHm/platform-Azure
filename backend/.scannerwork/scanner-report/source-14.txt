import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class GetVmSizesDto {
  @IsNumber()
  @ValidateIf((_, value) => value === null)
  maxDataDiskCount: number;

  @IsNumber()
  @ValidateIf((_, value) => value === null)
  memoryInMB: number;

  @IsString()
  @ValidateIf((_, value) => value === null)
  name: string;

  @IsNumber()
  @ValidateIf((_, value) => value === null)
  numberOfCores: number;

  @IsNumber()
  @ValidateIf((_, value) => value === null)
  osDiskSizeInMB: number;

  @IsNumber()
  @ValidateIf((_, value) => value === null)
  resourceDiskSizeInMB: number;
}
