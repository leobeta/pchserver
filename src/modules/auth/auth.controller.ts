import { LocalAuthGuard } from './local-auth.guart';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
  // async login(@Body() { username, password }: LoginDto) {
  //   const user = await this.authService.login(username, password);
  //   if (!user) {
  //     throw new Error('Invalid credentials');
  //   }
  //   return user;
  // }
}
