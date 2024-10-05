import { IsString, ValidateIf } from 'class-validator';

export class GetImagesDto {
  @IsString()
  @ValidateIf((_, value) => value === null)
  architecture: string;

  @IsString()
  @ValidateIf((_, value) => value === null)
  offer: string;

  @IsString()
  @ValidateIf((_, value) => value === null)
  publisher: string;

  @IsString()
  @ValidateIf((_, value) => value === null)
  sku: string;

  @IsString()
  @ValidateIf((_, value) => value === null)
  urn: string;

  @IsString()
  @ValidateIf((_, value) => value === null)
  urnAlias: string;

  @IsString()
  @ValidateIf((_, value) => value === null)
  version: string;
}
