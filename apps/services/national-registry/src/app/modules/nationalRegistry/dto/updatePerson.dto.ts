import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { IsNationalId } from '@island.is/nest/validators'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePersonDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullName!: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  address!: string

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email!: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone!: string

  @ApiProperty()
  @IsOptional()
  @IsNationalId()
  partnerId!: string
}
