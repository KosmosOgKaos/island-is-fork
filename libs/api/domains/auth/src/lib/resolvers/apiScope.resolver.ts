import { Query, Parent, Resolver, ResolveField } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import type { User } from '@island.is/auth-nest-tools'
import { IdsUserGuard, CurrentUser } from '@island.is/auth-nest-tools'
import type { ApiScope as IApiScope } from '@island.is/clients/auth-public-api'
import { ScopeType } from '@island.is/clients/auth-public-api'

import { AuthService } from '../auth.service'
import { ApiScope } from '../models'

@UseGuards(IdsUserGuard)
@Resolver(() => ApiScope)
export class ApiScopeResolver {
  constructor(private authService: AuthService) {}

  @Query(() => [ApiScope], { name: 'authApiScopes' })
  getApiScopes(@CurrentUser() user: User): Promise<IApiScope[]> {
    return this.authService.getApiScopes(user)
  }

  @ResolveField(() => String, { nullable: true, name: 'groupName' })
  resolveGroupName(@Parent() apiScope: IApiScope): string | undefined {
    return apiScope.group?.displayName
  }

  @ResolveField('type')
  resolveType(@Parent() apiScope: IApiScope): string {
    // TODO: waiting on implementation
    return 'ApiScope'
  }
}
