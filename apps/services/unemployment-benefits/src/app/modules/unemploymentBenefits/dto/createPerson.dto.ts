import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { IsNationalId } from '@island.is/nest/validators'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePersonDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName!: string

  @ApiProperty()
  @IsString()
  address!: string

  @ApiProperty()
  @IsEmail()
  email!: string

  @ApiProperty()
  @IsString()
  phone!: string

  @ApiProperty()
  @IsOptional()
  @IsNationalId()
  partnerId!: string
}
