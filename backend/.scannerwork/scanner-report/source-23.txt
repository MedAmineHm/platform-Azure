import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User).pre(
  'save',
  async function (next: any) {
    if (this['password']) {
      try {
        if (!this.isModified('password')) {
          return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
      } catch (err) {
        return next(err);
      }
    }
  },
);
