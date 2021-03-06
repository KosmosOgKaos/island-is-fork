import React, { useEffect, useState } from 'react'
import { PageLayout } from '@island.is/judicial-system-web/src/shared-components'
import { Case, SessionArrangements } from '@island.is/judicial-system/types'
import {
  CaseData,
  JudgeSubsections,
  Sections,
} from '@island.is/judicial-system-web/src/types'
import { useQuery } from '@apollo/client'
import { CaseQuery } from '@island.is/judicial-system-web/graphql'
import { useRouter } from 'next/router'
import CourtRecordForm from './CourtRecordForm'
import { useCase } from '@island.is/judicial-system-web/src/utils/hooks'

const CourtRecord = () => {
  const [workingCase, setWorkingCase] = useState<Case>()
  const { autofill } = useCase()

  const router = useRouter()
  const id = router.query.id

  const { data, loading } = useQuery<CaseData>(CaseQuery, {
    variables: { input: { id: id } },
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    document.title = 'Þingbók - Réttarvörslugátt'
  }, [])

  useEffect(() => {
    const defaultCourtAttendees = (wc: Case): string => {
      let attendees = ''

      if (wc.registrar) {
        attendees += `${wc.registrar.name} ${wc.registrar.title}\n`
      }

      if (wc.sessionArrangements !== SessionArrangements.REMOTE_SESSION) {
        if (wc.prosecutor) {
          attendees += `${wc.prosecutor.name} ${wc.prosecutor.title}\n`
        }

        if (
          wc.sessionArrangements === SessionArrangements.ALL_PRESENT &&
          wc.accusedName
        ) {
          attendees += `${wc.accusedName} varnaraðili`
        }

        if (
          wc.sessionArrangements === SessionArrangements.ALL_PRESENT &&
          wc.defenderName
        ) {
          attendees += `\n${wc.defenderName} skipaður ${
            wc.defenderIsSpokesperson ? 'talsmaður' : 'verjandi'
          } varnaraðila`
        }
      }

      return attendees
    }

    if (!workingCase && data?.case) {
      const theCase = data.case

      autofill('courtStartDate', new Date().toString(), theCase)

      autofill('courtAttendees', defaultCourtAttendees(theCase), theCase)

      if (theCase.demands) {
        autofill('prosecutorDemands', theCase.demands, theCase)
      }
      setWorkingCase(data.case)
    }
  }, [workingCase, setWorkingCase, data])

  return (
    <PageLayout
      activeSection={
        workingCase?.parentCase ? Sections.JUDGE_EXTENSION : Sections.JUDGE
      }
      activeSubSection={JudgeSubsections.COURT_RECORD}
      isLoading={loading}
      notFound={data?.case === undefined}
      parentCaseDecision={workingCase?.parentCase?.decision}
      caseType={workingCase?.type}
      caseId={workingCase?.id}
    >
      {workingCase && (
        <CourtRecordForm
          workingCase={workingCase}
          setWorkingCase={setWorkingCase}
          isLoading={loading}
        />
      )}
    </PageLayout>
  )
}

export default CourtRecord
