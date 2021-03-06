import React, { FC } from 'react'
import { FieldBaseProps } from '@island.is/application/core'
import {
  Box,
  Text,
  GridRow,
  GridColumn,
  Stack,
} from '@island.is/island-ui/core'
import { m } from '../../lib/messages'
import { useLocale } from '@island.is/localization'

export const ACTIVE_PARTIES: { letter: string; name: string }[] = [
  { letter: 'A', name: 'Björt framtíð' },
  { letter: 'B', name: 'Framsóknarflokkur' },
  { letter: 'C', name: 'Viðreisn' },
  { letter: 'D', name: 'Sjálfstæðisflokkur' },
  { letter: 'F', name: 'Flokkur fólksins' },
  { letter: 'J', name: 'Sósíalistaflokkur' },
  { letter: 'M', name: 'Miðflokkurinn' },
  { letter: 'O', name: 'Frjálslyndi lýðræðisflokkurinn' },
  { letter: 'P', name: 'Píratar' },
  { letter: 'R', name: 'Alþýðufylkingin' },
  {
    letter: 'S',
    name: 'Samfylkingin – jafnaðarmannaflokkur Íslands',
  },
  {
    letter: 'T',
    name: 'Dögun – stjórnmálasamtök um réttlæti, sanngirni og lýðræði',
  },
  { letter: 'V', name: 'Vinstrihreyfingin – grænt framboð' },
  { letter: 'Þ', name: 'Frelsisflokkurinn' },
]

const PartyLetter: FC<FieldBaseProps> = () => {
  const { formatMessage } = useLocale()

  const indexOfHalf = Math.ceil(ACTIVE_PARTIES.length / 2)
  const first = ACTIVE_PARTIES.slice(0, indexOfHalf)
  const second = ACTIVE_PARTIES.slice(indexOfHalf)

  const renderPartyList = (list: { letter: string; name: string }[]) => (
    <Stack space={1}>
      {list.map((party, index) => {
        return (
          <Text variant="small" key={index}>
            <strong>{`${party.letter}-listi: `}</strong> {party.name}
          </Text>
        )
      })}
    </Stack>
  )

  return (
    <Box marginTop={4}>
      <Text variant="h5" marginBottom={3} marginTop={5}>
        {formatMessage(m.selectPartyLetter.partyLetterSubtitle)}
      </Text>
      <GridRow>
        <GridColumn span={['12/12', '6/12']}>
          {renderPartyList(first)}
        </GridColumn>
        <GridColumn span={['12/12', '6/12']}>
          {renderPartyList(second)}
        </GridColumn>
      </GridRow>
    </Box>
  )
}

export default PartyLetter
