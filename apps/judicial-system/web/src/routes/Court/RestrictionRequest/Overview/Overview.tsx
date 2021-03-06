import React, { useEffect, useState } from 'react'
import { isNextDisabled } from '@island.is/judicial-system-web/src/utils/stepHelper'
import {
  FormFooter,
  PageLayout,
  FormContentContainer,
} from '@island.is/judicial-system-web/src/shared-components'
import * as Constants from '@island.is/judicial-system-web/src/utils/constants'
import {
  Case,
  CaseState,
  CaseTransition,
} from '@island.is/judicial-system/types'
import { useQuery } from '@apollo/client'
import { CaseQuery } from '@island.is/judicial-system-web/graphql'
import {
  CaseData,
  JudgeSubsections,
  Sections,
} from '@island.is/judicial-system-web/src/types'
import { useRouter } from 'next/router'
import { useCase } from '@island.is/judicial-system-web/src/utils/hooks'
import OverviewForm from './OverviewForm'
import DraftConclusionModal from '../../SharedComponents/DraftConclusionModal/DraftConclusionModal'

export const JudgeOverview: React.FC = () => {
  const [courtCaseNumberEM, setCourtCaseNumberEM] = useState('')
  const [workingCase, setWorkingCase] = useState<Case>()
  const [isDraftingConclusion, setIsDraftingConclusion] = useState<boolean>()
  const [createCourtCaseSuccess, setCreateCourtCaseSuccess] = useState<boolean>(
    false,
  )

  const router = useRouter()
  const id = router.query.id

  const {
    createCourtCase,
    isCreatingCourtCase,
    transitionCase,
    isTransitioningCase,
  } = useCase()

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

  const handleCreateCourtCase = async (workingCase: Case) => {
    await createCourtCase(workingCase, setWorkingCase, setCourtCaseNumberEM)

    if (courtCaseNumberEM === '') {
      setCreateCourtCaseSuccess(true)
    }
  }

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
      {workingCase ? (
        <>
          <OverviewForm
            workingCase={workingCase}
            setWorkingCase={setWorkingCase}
            handleCreateCourtCase={handleCreateCourtCase}
            createCourtCaseSuccess={createCourtCaseSuccess}
            setCreateCourtCaseSuccess={setCreateCourtCaseSuccess}
            courtCaseNumberEM={courtCaseNumberEM}
            setCourtCaseNumberEM={setCourtCaseNumberEM}
            setIsDraftingConclusion={setIsDraftingConclusion}
            isCreatingCourtCase={isCreatingCourtCase}
          />
          <FormContentContainer isFooter>
            <FormFooter
              previousUrl={Constants.REQUEST_LIST_ROUTE}
              nextUrl={`${Constants.HEARING_ARRANGEMENTS_ROUTE}/${id}`}
              nextIsDisabled={isNextDisabled([
                {
                  value: workingCase.courtCaseNumber ?? '',
                  validations: ['empty'],
                },
              ])}
            />
          </FormContentContainer>
          <DraftConclusionModal
            workingCase={workingCase}
            setWorkingCase={setWorkingCase}
            isDraftingConclusion={isDraftingConclusion}
            setIsDraftingConclusion={setIsDraftingConclusion}
          />
        </>
      ) : null}
    </PageLayout>
  )
}

export default JudgeOverview
