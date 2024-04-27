import { IsString, IsEnum, IsOptional, IsEmail, IsInt } from 'class-validator';
import { E_USER_STATUS } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @IsEnum(E_USER_STATUS)
  readonly status: E_USER_STATUS;

  @IsOptional()
  @IsInt()
  readonly groupId: null | number;
}
