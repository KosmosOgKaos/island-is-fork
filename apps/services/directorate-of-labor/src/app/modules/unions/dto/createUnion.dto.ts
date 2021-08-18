import { IsBoolean, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUnionDto {
  @ApiProperty()
  @IsString()
  name!: string
}
