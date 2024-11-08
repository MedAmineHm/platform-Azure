import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { RegisterDTO, RegisterGoogleDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import * as bcrypt from 'bcryptjs';
import { Payload } from 'src/types/payload';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  // Create new user
  async create(registerDTO: RegisterDTO) {
    const { email, password } = registerDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    if (!password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }

    const createUser = new this.userModel(registerDTO);
    await createUser.save();
    return this.sanitizeUser(createUser);
  }

  // Find by payload
  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  // Find by login
  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password.toString(), user.password)) {
      return this.sanitizeUser(user);
    } else {
      console.log({ user });
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async createFromGoogle(registerGoogleDTO: RegisterGoogleDTO) {
    const createUser = new this.userModel(registerGoogleDTO);
    await createUser.save();
    return this.sanitizeUser(createUser);
  }

  // return user object without password
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneByResetToken(token: string): Promise<User | null> {
    return this.userModel.findOne({ resetToken: token }).exec();
  }

  async save(user: User): Promise<User> {
    return user.save();
  }
}
