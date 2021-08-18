import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { IsNationalId } from '@island.is/nest/validators'
import { ApiProperty } from '@nestjs/swagger'

export class CreateApplicationDto {
  @ApiProperty()
  @IsNationalId()
  nationalId!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  secretWord!: string

  @ApiProperty()
  @IsBoolean()
  getPaperCopy!: boolean

  @ApiProperty()
  @IsString()
  employmentStatus!: string

  @ApiProperty()
  @IsInt()
  employmentRatio!: number

  @ApiProperty()
  @IsString()
  bank!: string

  @ApiProperty()
  @IsUUID()
  pensionFundId!: string

  @ApiProperty()
  @IsUUID()
  unionId!: string

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  privatePensionFundId!: string

  @ApiProperty()
  @IsNumber()
  pensionFundPercentage!: number

  @ApiProperty()
  @IsNumber()
  personalTaxCreditRatio!: number

  @ApiProperty()
  @IsInt()
  monthlyIncome!: number

  @ApiProperty()
  @IsInt()
  insurancePayments!: number

  @ApiProperty()
  @IsBoolean()
  onParentalLeave!: boolean
}
