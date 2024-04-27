import { IsString, IsNotEmpty, IsEnum, IsInt } from 'class-validator';
import { E_USER_STATUS } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserStatusDto {
  @ApiProperty({ required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsEnum(E_USER_STATUS)
  readonly status: E_USER_STATUS;

  @ApiProperty({ required: true, nullable: false })
  @IsNotEmpty()
  @IsInt()
  readonly id?: number;
}
