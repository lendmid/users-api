import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/filters.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: false })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: false })
  email: string;
}
