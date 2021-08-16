import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType()
export class SubmitApplicationResponse {
  @Field(() => ID)
  id!: string

  @Field()
  name!: string
}
