import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { CurrentUser, IdsUserGuard, User } from '@island.is/auth-nest-tools'
import { UseGuards } from '@nestjs/common'
import { UnemploymentService } from './unemployment.service'
import { SubmitApplicationResponse } from './models/submitApplicationResponse.model'
import { SubmitApplicationDto } from './dto/submitApplication.input'

@UseGuards(IdsUserGuard)
@Resolver('UnemploymentResolver')
export class UnemploymentResolver {
  constructor(private unemploymentService: UnemploymentService) {}

  @Mutation(() => SubmitApplicationResponse)
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
