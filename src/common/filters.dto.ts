import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({
    required: false,
    nullable: true,
    default: 10,
  })
  take: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, default: 0 })
  skip: number;
}
