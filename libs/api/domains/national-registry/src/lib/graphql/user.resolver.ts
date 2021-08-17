import { UseGuards } from '@nestjs/common'
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql'
import * as kennitala from 'kennitala'

import { Scopes, User as AuthUser } from '@island.is/auth-nest-tools'
import {
  IdsUserGuard,
  ScopesGuard,
  CurrentUser,
} from '@island.is/auth-nest-tools'
import { Audit } from '@island.is/nest/audit'
import { NationalRegistryScope } from '@island.is/auth/scopes'
import { NationalRegistryUser, Citizenship } from './models'
import { NationalRegistryService } from '../nationalRegistry.service'
import { User } from '../types'
import { NationalRegistryGetPerson } from './models/person.model'

@UseGuards(IdsUserGuard, ScopesGuard)
@Resolver(() => NationalRegistryUser)
@Audit({ namespace: '@island.is/api/national-registry' })
export class UserResolver {
  constructor(
    private readonly nationalRegistryService: NationalRegistryService,
  ) {}

  @Query(() => NationalRegistryUser, {
    name: 'nationalRegistryUser',
    nullable: true,
  })
  @Audit()
  user(@CurrentUser() user: AuthUser): Promise<User> {
    return this.nationalRegistryService.getUser(user.nationalId)
  }

  /*
   * We make sure the model and type match here by not defining return type on getPerson in service
   * This way the build will fail if changes are made to the underlying service since the types are generated at build
   */
  @Scopes(NationalRegistryScope.individuals)
  @Query(() => NationalRegistryGetPerson)
  @Audit()
  getPerson(@CurrentUser() user: AuthUser): Promise<NationalRegistryGetPerson> {
    return this.nationalRegistryService.getPerson(user.nationalId)
  }

  @ResolveField('citizenship', () => Citizenship, { nullable: true })
  resolveCitizenship(@Parent() user: User): Citizenship {
    return user.citizenship
  }

  @ResolveField('legalResidence', () => String, { nullable: true })
  resolveLegalResidence(@Parent() { address }: User): string {
    return `${address.streetAddress}, ${address.postalCode} ${address.city}`
  }

  @ResolveField('birthPlace', () => String, { nullable: true })
  resolveBirthPlace(@Parent() { birthPlace }: User): string {
    return birthPlace.city
  }

  @ResolveField('age', () => Number)
  resolveAge(@Parent() { nationalId }: User): number {
    return kennitala.info(nationalId).age
  }

  @ResolveField('birthday', () => Date)
  resolveBirthday(@Parent() { nationalId }: User): Date {
    return kennitala.info(nationalId).birthday
  }
}
