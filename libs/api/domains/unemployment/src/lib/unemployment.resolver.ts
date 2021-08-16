import { Resolver, Query, Args } from '@nestjs/graphql'
import { IdsUserGuard } from '@island.is/auth-nest-tools'
import { UseGuards } from '@nestjs/common'
import { UnemploymentService } from './unemployment.service'
import { SubmitApplicationResponse } from './models/submitApplicationResponse.model'
import { SubmitApplicationDto } from './dto/submitApplication.input'

@UseGuards(IdsUserGuard)
@Resolver('UnemploymentResolver')
export class UnemploymentResolver {
  constructor(private unemploymentService: UnemploymentService) {}

  @Query(() => SubmitApplicationResponse)
  async unemploymentSubmitApplication(
    @Args('input') application: SubmitApplicationDto,
  ): Promise<SubmitApplicationResponse> {
    return this.unemploymentService.submitApplication(application)
  }
}
