import { IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePensionFundDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name!: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  active!: boolean
}
