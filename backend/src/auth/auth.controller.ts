import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDTO } from 'src/user/dtos/register.dto';
import { LoginDTO } from 'src/user/dtos/login.dto';
import { Response } from 'express';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }

  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Request() req, @Res() res: Response) {
    const userFromGoogle = req.user;
    const { email, firstName, lastName } = userFromGoogle;

    // check if the user exists
    let user = await this.authService.validateUser(userFromGoogle);

    // if not create the user
    if (!user) {
      user = await this.userService.createFromGoogle({
        email,
        firstName,
        lastName,
      });
    }

    // return the token embeded to url
    const payload = {
      email,
    };
    const token = await this.authService.signPayload(payload);

    res.redirect(`http://localhost:3000/accept-google-auth?token=${token}`);
  }
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
    try {
      await this.authService.sendPasswordResetEmail(forgotPasswordDTO.email);
      return { message: 'Check your email' };
    } catch (e) {
      console.log(e);
      return { message: 'error' };
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    await this.authService.resetPassword(resetPasswordDTO);
    return { message: 'password reset was successful' };
  }
}
