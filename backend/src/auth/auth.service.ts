import { Injectable, NotFoundException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { Payload } from 'src/types/payload';
import { UserService } from 'src/user/user.service';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv'; // Importer le module dotenv

dotenv.config({ path: 'backend.env' });

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
  async sendPasswordResetEmail(email: string): Promise<string> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = await this.generateResetToken(email);

    const resetLink = `http://localhost:3000/reset-password/:email?secret=${resetToken}`;

    // send the mail here ...
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'amiinhm1@gmail.com',
        pass: 'vukc tfrc qtfm ekza',
      },
    });

    const mailOptions = {
      from: 'amiinhm1@gmail.com',
      to: email,
      subject: 'AppName - reset your password',
      text: `Access this link to reset your password: ${resetLink}`,
    };

    return await transporter.sendMail(mailOptions);
  }

  async resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<string> {
    const { token, newPassword } = resetPasswordDTO;

    // Verify the reset token - You might want to use try-catch for token verification
    const decodedToken = verify(token, process.env.SECRET_KEY) as JwtPayload;

    // Retrieve user by email from decoded token
    const user = await this.userService.findByEmail(
      decodedToken.email as string,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user's password - You may need to hash the password before saving
    user.password = newPassword;

    // Clear the reset token
    user.resetToken = undefined;

    // Save the updated user to the database
    await this.userService.save(user);

    return 'Password reset successful';
  }

  private async generateResetToken(email: string): Promise<string> {
    return sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
  }
}
