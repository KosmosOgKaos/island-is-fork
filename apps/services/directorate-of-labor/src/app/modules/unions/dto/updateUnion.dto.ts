import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUnionDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name!: string

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  active!: string
}
