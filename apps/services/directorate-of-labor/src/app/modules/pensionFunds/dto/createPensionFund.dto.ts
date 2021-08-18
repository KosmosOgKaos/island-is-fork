import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePensionFundDto {
  @ApiProperty()
  @IsString()
  name!: string
}
