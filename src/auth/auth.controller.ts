import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { SignUpBody, SignupDto, signupSchema } from './dto/signup.dto';
import { LoginBody, LoginDto, loginSchema } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeaders,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ description: 'User registered successfully' })
  @ApiBody({ type: SignUpBody })
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({ description: 'User logged in successfully' })
  @ApiBody({ type: LoginBody })
  login(
    @Body(new ZodValidationPipe(loginSchema))
    body: LoginDto,
  ) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Delete('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiOkResponse({ description: 'User logged out successfully' })
  @ApiBearerAuth()
  logout(@Request() req) {
    return this.authService.logout(req.session.sessionId);
  }
}
