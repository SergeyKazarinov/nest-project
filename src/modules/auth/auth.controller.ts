import { Controller, Post, Req } from '@nestjs/common';

import { User } from '../users/entities/user.entity';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  login(@Req() req: Request & { user: User }) {
    return this.authService.login(req.user);
  }
}
