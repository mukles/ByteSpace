import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { AuthService } from "./auth.service";
import {
  LoginRequestDto,
  RefreshRequestDto,
  RegisterRequestDto,
} from "./dto/auth-request.dto";
import {
  AuthTokensResponseDto,
  MeResponseDto,
  SessionResponseDto,
} from "./dto/auth-response.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(201)
  async register(@Body() body: RegisterRequestDto): Promise<SessionResponseDto> {
    const { user, tokens } = await this.authService.register(body);
    return { user, ...AuthTokensResponseDto.from(tokens) };
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() body: LoginRequestDto): Promise<SessionResponseDto> {
    const { user, tokens } = await this.authService.login(
      body.email,
      body.password,
    );
    return { user, ...AuthTokensResponseDto.from(tokens) };
  }

  @Post("refresh")
  @HttpCode(200)
  async refresh(@Body() body: RefreshRequestDto): Promise<SessionResponseDto> {
    if (!body.refresh_token) {
      throw new UnauthorizedException("No refresh token");
    }
    const { user, tokens } = await this.authService.refresh(body.refresh_token);
    return { user, ...AuthTokensResponseDto.from(tokens) };
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Body() body: RefreshRequestDto): Promise<{ ok: true }> {
    await this.authService.logout(body.refresh_token);
    return { ok: true };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  getMe(@Req() request: Request): MeResponseDto {
    const { user, accessToken } = request;
    if (!user || !accessToken) {
      throw new UnauthorizedException("Access token missing");
    }
    return this.authService.describeSession(user, accessToken);
  }
}
