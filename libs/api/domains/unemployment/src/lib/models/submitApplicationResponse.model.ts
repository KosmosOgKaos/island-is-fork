import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SubmitApplicationResponse {
  @Field()
  success!: boolean
}
