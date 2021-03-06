import React, { useEffect, useState } from 'react'
import { PageLayout } from '@island.is/judicial-system-web/src/shared-components'
import {
  Case,
  CaseState,
  CaseTransition,
} from '@island.is/judicial-system/types'
import {
  CaseData,
  JudgeSubsections,
  Sections,
} from '@island.is/judicial-system-web/src/types'
import { useQuery } from '@apollo/client'
import { CaseQuery } from '@island.is/judicial-system-web/graphql'
import { useRouter } from 'next/router'
import OverviewForm from './OverviewForm'
import { useCase } from '@island.is/judicial-system-web/src/utils/hooks'

const Overview = () => {
  const [workingCase, setWorkingCase] = useState<Case>()

  const router = useRouter()
  const id = router.query.id

  const { transitionCase, isTransitioningCase } = useCase()

  const { data, loading } = useQuery<CaseData>(CaseQuery, {
    variables: { input: { id: id } },
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    document.title = 'Yfirlit kröfu - Réttarvörslugátt'
  }, [])

  useEffect(() => {
    if (!workingCase && data?.case) {
      setWorkingCase(data.case)
    }
  }, [workingCase, setWorkingCase, data])

  // Transition case from SUBMITTED to RECEIVED when courtCaseNumber is set
  useEffect(() => {
    if (
      workingCase?.courtCaseNumber &&
      workingCase?.state === CaseState.SUBMITTED &&
      !isTransitioningCase
    ) {
      transitionCase(workingCase, CaseTransition.RECEIVE, setWorkingCase)
    }
  }, [
    workingCase,
    workingCase?.courtCaseNumber,
    isTransitioningCase,
    transitionCase,
  ])

  return (
    <PageLayout
      activeSection={
        workingCase?.parentCase ? Sections.JUDGE_EXTENSION : Sections.JUDGE
      }
      activeSubSection={JudgeSubsections.JUDGE_OVERVIEW}
      isLoading={loading}
      notFound={data?.case === undefined}
      parentCaseDecision={workingCase?.parentCase?.decision}
      caseType={workingCase?.type}
      caseId={workingCase?.id}
    >
      {workingCase && (
        <OverviewForm
          workingCase={workingCase}
          setWorkingCase={setWorkingCase}
          isLoading={loading}
        />
      )}
    </PageLayout>
  )
}

export default Overview
