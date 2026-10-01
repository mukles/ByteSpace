import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

const trim = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() : value;

const normalizeEmail = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim().toLowerCase() : value;

export class LoginRequestDto {
  @Transform(normalizeEmail)
  @IsEmail({}, { message: "Enter a valid email address" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password!: string;
}

export class RegisterRequestDto {
  @Transform(trim)
  @IsString({ message: "Name is required" })
  @Length(2, 80, { message: "Name must be between 2 and 80 characters" })
  name!: string;

  @Transform(normalizeEmail)
  @IsEmail({}, { message: "Enter a valid email address" })
  email!: string;

  @IsString()
  @Length(8, 72, { message: "Password must be between 8 and 72 characters" })
  password!: string;
}

export class RefreshRequestDto {
  @IsOptional()
  @IsString()
  refresh_token?: string;
}
