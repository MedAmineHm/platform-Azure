import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './User.schema';

@Schema()
export class Board {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  board: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
