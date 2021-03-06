import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class ApplicationPaymentChargeInput {
  @Field()
  @IsString()
  applicationId!: string

  @Field()
  @IsString()
  chargeItemCode!: string

  // TODO: charge parameters for other types of payments
}
