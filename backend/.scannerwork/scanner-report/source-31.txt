import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  resetToken?: string;
}
