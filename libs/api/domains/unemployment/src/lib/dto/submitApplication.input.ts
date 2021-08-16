import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SubmitApplicationDto {
  @Field()
  secretWord!: string

  @Field()
  getPaperCopy!: boolean

  @Field()
  employmentStatus!: string

  @Field()
  employmentRatio!: number

  @Field()
  bank!: string

  @Field()
  pensionFund!: string

  @Field()
  union!: string

  @Field()
  privatePensionFund!: string

  @Field()
  pensionFundPercentage!: number

  @Field()
  personalTaxCreditRatio!: number

  @Field()
  monthlyIncome!: number

  @Field()
  insurancePayments!: number

  @Field()
  onParentalLeave!: boolean
}
