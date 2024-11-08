import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class AvailabilityZoneMappings {
  @Prop({ required: true })
  logicalZone: string;

  @Prop({ required: true })
  physicalZone: string;
}

@Schema()
class PairedRegion {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;
}

@Schema()
class Meta {
  @Prop({ required: true })
  geography: string;

  @Prop({ required: true })
  geographyGroup: string;

  @Prop({ required: true })
  latitude: string;

  @Prop({ required: true })
  longitude: string;

  @Prop({ required: true })
  pairedRegion: PairedRegion;

  @Prop({ required: true })
  physicalLocation: string;

  @Prop({ required: true })
  regionCategory: string;

  @Prop({ required: true })
  regionType: string;
}

@Schema()
export class Location {
  @Prop()
  availabilityZoneMappings: AvailabilityZoneMappings[];

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  id: string;

  @Prop()
  meta: Meta;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  regionalDisplayName: string;

  @Prop()
  type: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
