import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator'
import { IsNationalId } from '@island.is/nest/validators'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateApplicationDto {
  @ApiProperty()
  @IsOptional()
  @IsNationalId()
  nationalId!: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  secretWord!: string

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  getPaperCopy!: boolean

  @ApiProperty()
  @IsOptional()
  @IsString()
  employmentStatus!: string

  @ApiProperty()
  @IsOptional()
  @IsInt()
  employmentRatio!: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  bank!: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  pensionFund!: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  union!: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  privatePensionFund!: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  pensionFundPercentage!: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  personalTaxCreditRatio!: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  personalTaxCreditMonthlyAmount!: number

  @ApiProperty()
  @IsOptional()
  @IsInt()
  monthlyIncome!: number

  @ApiProperty()
  @IsOptional()
  @IsInt()
  insurancePayments!: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  pensionPayments!: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  incomeStepOne!: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  incomeStepTwo!: number

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  onParentalLeave!: boolean
}
