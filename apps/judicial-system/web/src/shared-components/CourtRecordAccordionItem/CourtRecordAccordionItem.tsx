import React from 'react'
import { Text, Box, AccordionItem } from '@island.is/island-ui/core'

import {
  capitalize,
  formatAccusedByGender,
  formatDate,
  NounCases,
  TIME_FORMAT,
} from '@island.is/judicial-system/formatters'
import {
  AccusedPleaDecision,
  Case,
  CaseGender,
} from '@island.is/judicial-system/types'
import AccordionListItem from '../AccordionListItem/AccordionListItem'

interface Props {
  workingCase: Case
}

const CourtRecordAccordionItem: React.FC<Props> = ({ workingCase }: Props) => {
  return (
    <AccordionItem id="id_2" label="Þingbók" labelVariant="h3">
      <Box marginBottom={2}>
        <Text variant="h4" as="h4">
          Upplýsingar
        </Text>
      </Box>
      <Box marginBottom={3}>
        <Text>
          {`Þinghald frá kl. ${formatDate(
            workingCase.courtStartTime,
            TIME_FORMAT,
          )} til kl. ${formatDate(
            workingCase.courtEndTime,
            TIME_FORMAT,
          )} ${formatDate(workingCase.courtEndTime, 'PP')}`}
        </Text>
      </Box>
      <AccordionListItem title="Krafa lögreglu" breakSpaces>
        <Text>{workingCase.policeDemands}</Text>
      </AccordionListItem>
      <AccordionListItem title="Viðstaddir" breakSpaces>
        <Text>{workingCase.courtAttendees}</Text>
      </AccordionListItem>
      <AccordionListItem title="Dómskjöl">
        <Text>Krafa lögreglu þingmerkt nr. 1.</Text>
        <Text>
          Rannsóknargögn málsins liggja frammi.
          <br />
          <br />
          {workingCase.courtDocuments?.map((courtDocument, index) => {
            return (
              <>
                {`${capitalize(courtDocument)} þingmerkt nr. ${index + 2}.`}
                {index <= (workingCase.courtDocuments || []).length && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </>
            )
          })}
        </Text>
      </AccordionListItem>
      <AccordionListItem
        title={`Réttindi ${formatAccusedByGender(
          workingCase.accusedGender || CaseGender.OTHER,
          NounCases.DATIVE,
        )}`}
      >
        <Text>
          Sakborning er bent á að honum sé óskylt að svara spurningum er varða
          brot það sem honum er gefið að sök, sbr. 2. mgr. 113. gr. laga nr.
          88/2008. Sakborning er enn fremur áminntur um sannsögli kjósi hann að
          tjá sig um sakarefnið, sbr. 1. mgr. 114. gr. sömu laga.
        </Text>
      </AccordionListItem>
      <AccordionListItem
        title={`Afstaða ${formatAccusedByGender(
          workingCase.accusedGender || CaseGender.OTHER,
          NounCases.DATIVE,
        )}`}
        breakSpaces
      >
        <Text>
          {`${
            workingCase.accusedPleaDecision === AccusedPleaDecision.REJECT
              ? `Kærði hafnar kröfunni. `
              : workingCase.accusedPleaDecision === AccusedPleaDecision.ACCEPT
              ? `Kærði samþykkir kröfuna. `
              : ''
          }${workingCase.accusedPleaAnnouncement}`}
        </Text>
      </AccordionListItem>
      <AccordionListItem title="Málflutningur" breakSpaces>
        <Text>{workingCase.litigationPresentations}</Text>
      </AccordionListItem>
    </AccordionItem>
  )
}

export default CourtRecordAccordionItem
