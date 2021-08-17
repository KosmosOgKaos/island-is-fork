import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { IsNationalId } from '@island.is/nest/validators'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePersonDto {
  @ApiProperty()
  @IsString()
  @IsNationalId()
  nationalId!: string

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
