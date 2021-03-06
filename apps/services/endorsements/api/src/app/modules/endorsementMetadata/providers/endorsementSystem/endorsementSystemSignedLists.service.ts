import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Endorsement } from '../../../endorsement/models/endorsement.model'
import { EndorsementList } from '../../../endorsementList/endorsementList.model'
import { EndorsementTag } from '../../../endorsementList/constants'
import { MetadataProvider } from '../../types'

export interface EndorsementSystemSignedListsInput {
  nationalId: string
}
export interface EndorsementSystemSignedListsResponse {
  tags: EndorsementTag[]
}

@Injectable()
export class EndorsementSystemSignedListsService implements MetadataProvider {
  constructor(
    @InjectModel(Endorsement)
    private readonly endorsementModel: typeof Endorsement,
  ) {}
  metadataKey = 'endorsementListSignedTags'

  async getData(input: EndorsementSystemSignedListsInput) {
    const endorsements = await this.endorsementModel.findAll({
      where: { endorser: input.nationalId },
      include: [{ model: EndorsementList, attributes: ['tags'] }],
    })
    const tags = endorsements.reduce(
      (uniqueTags: EndorsementTag[], endorsement) => {
        return [...uniqueTags, ...(endorsement.endorsementList?.tags ?? [])]
      },
      [],
    )

    return {
      tags: [...new Set(tags)],
    }
  }
}
