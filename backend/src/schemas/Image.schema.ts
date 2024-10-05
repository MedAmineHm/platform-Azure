import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Image {
  @Prop({ required: true })
  architecture: string;

  @Prop({ required: true })
  offer: string;

  @Prop({ required: true })
  publisher: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  urn: string;

  @Prop({ required: true })
  urnAlias: string;

  @Prop({ required: true })
  version: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
