import { UseGuards } from '@nestjs/common'
import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { CurrentUser, IdsUserGuard, Scopes } from '@island.is/auth-nest-tools'
import { UnemploymentScope } from '@island.is/auth/scopes'
import type { User } from '@island.is/auth-nest-tools'
import { Audit } from '@island.is/nest/audit'
import { UnemploymentService } from './unemployment.service'
import { SubmitApplicationResponse } from './models/submitApplicationResponse.model'
import { SubmitApplicationDto } from './dto/submitApplication.input'

@Audit({
  namespace: '@island.is/api/unemployment',
})
@UseGuards(IdsUserGuard)
@Resolver('UnemploymentResolver')
export class UnemploymentResolver {
  constructor(private unemploymentService: UnemploymentService) {}

  @Scopes(UnemploymentScope.main)
  @Mutation(() => SubmitApplicationResponse)
  @Audit()
  async unemploymentSubmitApplication(
    @CurrentUser() auth: User,
    @Args('input') application: SubmitApplicationDto,
  ): Promise<SubmitApplicationResponse> {
    return await this.unemploymentService.submitApplication(
      auth.nationalId,
      application,
    )
  }
}
