import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { RefreshToken } from "./auth/entities/refresh-token.entity";
import { User } from "./auth/entities/user.entity";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { RefreshTokenRepository } from "./auth/repositories/refresh-token.repository";
import { SessionRepository } from "./auth/repositories/session.repository";
import { UserRepository } from "./auth/repositories/user.repository";
import { databaseOptions } from "./database.config";
import { HealthController } from "./health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...databaseOptions(config.get<string>("DATABASE_URL")),
        migrationsRun: true,
      }),
    }),
    TypeOrmModule.forFeature([User, RefreshToken]),
  ],
  controllers: [HealthController, AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    UserRepository,
    RefreshTokenRepository,
    SessionRepository,
  ],
})
export class AppModule {}
