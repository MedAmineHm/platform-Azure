import { Module } from '@nestjs/common';
import { AzureController } from './azure.controller';
import { AzureService } from './azure.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from 'src/schemas/Location.schema';
import { Image, ImageSchema } from 'src/schemas/Image.schema';
import { VmSize, VmSizeSchema } from 'src/schemas/VmSize.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Location.name,
        schema: LocationSchema,
      },
      {
        name: Image.name,
        schema: ImageSchema,
      },
      {
        name: VmSize.name,
        schema: VmSizeSchema,
      },
    ]),
  ],
  controllers: [AzureController],
  providers: [AzureService],
})
export class AzureModule {}
