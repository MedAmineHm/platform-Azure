import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class VmSizeOption {
  @Prop({ required: true })
  maxDataDiskCount: number;

  @Prop({ required: true })
  memoryInMB: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  numberOfCores: number;

  @Prop({ required: true })
  osDiskSizeInMB: number;

  @Prop({ required: true })
  resourceDiskSizeInMB: number;
}

@Schema()
export class VmSize {
  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  options: VmSizeOption[];
}

export const VmSizeSchema = SchemaFactory.createForClass(VmSize);
