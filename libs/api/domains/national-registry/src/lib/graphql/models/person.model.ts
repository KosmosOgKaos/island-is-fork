import { Field, ObjectType, ID } from '@nestjs/graphql'

/**
 * This types is oddly named to avoid conflicts with existing types
 * Ideally we would use existing systems to get national registry
 */
@ObjectType()
export class NationalRegistryGetPerson {
  @Field(() => ID)
  nationalId!: string

  @Field()
  name!: string

  @Field()
  phoneNumber!: string

  @Field()
  email!: string

  @Field()
  address!: string

  @Field()
  partnerNationalId!: string

  @Field(() => [String])
  childrenNationalId!: string[]
}
