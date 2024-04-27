import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, nullable: false })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true, nullable: false })
  readonly email: string;
}
