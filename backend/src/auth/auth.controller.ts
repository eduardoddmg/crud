import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const user = await this.authService.registerUser(
      body.username,
      body.password,
    );
    return { message: 'User registered successfully', user };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    const token = await this.authService.generateToken({
      id: user.id,
      username: user.username,
    });

    return { message: 'User logged successfully', token };
  }

  @Post('unblock')
  async unblock(@Body() body: { username: string }) {
    return this.authService.unblockUser(body.username);
  }
}
