import React, { useState, useEffect, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { Box, Text, Accordion, AccordionItem } from '@island.is/island-ui/core'
import {
  Case,
  CaseCustodyProvisions,
  NotificationType,
  CaseState,
  CaseType,
  CaseTransition,
} from '@island.is/judicial-system/types'
import {
  formatDate,
  capitalize,
  laws,
} from '@island.is/judicial-system/formatters'
import {
  FormFooter,
  Modal,
  InfoCard,
  PageLayout,
  PdfButton,
  FormContentContainer,
  CaseFileList,
} from '@island.is/judicial-system-web/src/shared-components'
import * as Constants from '@island.is/judicial-system-web/src/utils/constants'
import {
  TIME_FORMAT,
  formatRequestedCustodyRestrictions,
} from '@island.is/judicial-system/formatters'
import { CaseQuery } from '@island.is/judicial-system-web/graphql'
import {
  ProsecutorSubsections,
  Sections,
} from '@island.is/judicial-system-web/src/types'
import { UserContext } from '@island.is/judicial-system-web/src/shared-components/UserProvider/UserProvider'
import { useCase } from '@island.is/judicial-system-web/src/utils/hooks'
import { requestCourtDate } from '@island.is/judicial-system-web/messages'

import * as styles from './Overview.treat'

export const Overview: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalText, setModalText] = useState('')
  const [workingCase, setWorkingCase] = useState<Case>()

  const router = useRouter()
  const id = router.query.id

  const { transitionCase, sendNotification, isSendingNotification } = useCase()
  const { user } = useContext(UserContext)
  const { formatMessage } = useIntl()
  const { data, loading } = useQuery(CaseQuery, {
    variables: { input: { id: id } },
    fetchPolicy: 'no-cache',
  })

  const handleNextButtonClick = async () => {
    if (!workingCase) {
      return
    }

    try {
      const shouldSubmitCase = workingCase.state === CaseState.DRAFT

      const caseSubmitted = shouldSubmitCase
        ? await transitionCase(
            workingCase,
            CaseTransition.SUBMIT,
            setWorkingCase,
          )
        : workingCase.state !== CaseState.NEW

      const notificationSent = caseSubmitted
        ? await sendNotification(
            workingCase.id,
            NotificationType.READY_FOR_COURT,
          )
        : false

      if (shouldSubmitCase) {
        // An SMS should have been sent
        if (notificationSent) {
          setModalText(
            'Tilkynning hefur veri?? send ?? d??mara og d??mritara ?? vakt.\n\n???? getur komi?? ??bendingum ?? framf??ri vi?? ??r??unarteymi R??ttarv??rslug??ttar um ??a?? sem m??tti betur fara ?? vinnslu m??la me?? ??v?? a?? smella ?? takkann h??r fyrir ne??an.',
          )
        } else {
          setModalText(
            'Ekki t??kst a?? senda tilkynningu ?? d??mara og d??mritara ?? vakt.\n\n???? getur komi?? ??bendingum ?? framf??ri vi?? ??r??unarteymi R??ttarv??rslug??ttar um ??a?? sem m??tti betur fara ?? vinnslu m??la me?? ??v?? a?? smella ?? takkann h??r fyrir ne??an.',
          )
        }
      } else {
        // No SMS
        setModalText(
          '???? getur komi?? ??bendingum ?? framf??ri vi?? ??r??unarteymi R??ttarv??rslug??ttar um ??a?? sem m??tti betur fara ?? vinnslu m??la me?? ??v?? a?? smella ?? takkann h??r fyrir ne??an.',
        )
      }

      setModalVisible(true)
    } catch (e) {
      // TODO: Handle error
    }
  }

  useEffect(() => {
    document.title = 'Yfirlit kr??fu - R??ttarv??rslug??tt'
  }, [])

  useEffect(() => {
    if (!workingCase && data?.case) {
      setWorkingCase(data.case)
    }
  }, [workingCase, setWorkingCase, data])

  return (
    <PageLayout
      activeSection={
        workingCase?.parentCase ? Sections.EXTENSION : Sections.PROSECUTOR
      }
      activeSubSection={ProsecutorSubsections.PROSECUTOR_OVERVIEW}
      isLoading={loading}
      notFound={data?.case === undefined}
      decision={workingCase?.decision}
      parentCaseDecision={workingCase?.parentCase?.decision}
      caseType={workingCase?.type}
      caseId={workingCase?.id}
    >
      {workingCase ? (
        <>
          <FormContentContainer>
            <Box marginBottom={10}>
              <Text as="h1" variant="h1">
                {`Yfirlit kr??fu um ${
                  workingCase.parentCase ? 'framlengingu ??' : ''
                } ${
                  workingCase.type === CaseType.CUSTODY
                    ? `g??sluvar??hald${workingCase.parentCase ? 'i' : ''}`
                    : `farbann${workingCase.parentCase ? 'i' : ''}`
                }`}
              </Text>
            </Box>
            <Box component="section" marginBottom={5}>
              <InfoCard
                data={[
                  {
                    title: 'L??KE m??lsn??mer',
                    value: workingCase.policeCaseNumber,
                  },
                  {
                    title: 'D??mst??ll',
                    value: workingCase.court?.name,
                  },
                  {
                    title: 'Emb??tti',
                    value: `${
                      workingCase.prosecutor?.institution?.name ?? 'Ekki skr????'
                    }`,
                  },
                  {
                    title: formatMessage(requestCourtDate.heading),
                    value: `${capitalize(
                      formatDate(
                        workingCase.requestedCourtDate,
                        'PPPP',
                        true,
                      ) ?? '',
                    )} eftir kl. ${formatDate(
                      workingCase.requestedCourtDate,
                      TIME_FORMAT,
                    )}`,
                  },
                  { title: '??k??randi', value: workingCase.prosecutor?.name },
                  {
                    title: workingCase.parentCase
                      ? `${
                          workingCase.type === CaseType.CUSTODY
                            ? 'Fyrri g??sla'
                            : 'Fyrra farbann'
                        }`
                      : 'T??mi handt??ku',
                    value: workingCase.parentCase
                      ? `${capitalize(
                          formatDate(
                            workingCase.parentCase.validToDate,
                            'PPPP',
                            true,
                          ) ?? '',
                        )} kl. ${formatDate(
                          workingCase.parentCase.validToDate,
                          TIME_FORMAT,
                        )}`
                      : workingCase.arrestDate
                      ? `${capitalize(
                          formatDate(workingCase.arrestDate, 'PPPP', true) ??
                            '',
                        )} kl. ${formatDate(
                          workingCase.arrestDate,
                          TIME_FORMAT,
                        )}`
                      : 'Var ekki skr????ur',
                  },
                ]}
                accusedName={workingCase.accusedName}
                accusedNationalId={workingCase.accusedNationalId}
                accusedAddress={workingCase.accusedAddress}
                defender={{
                  name: workingCase.defenderName ?? '',
                  email: workingCase.defenderEmail,
                  phoneNumber: workingCase.defenderPhoneNumber,
                }}
              />
            </Box>
            <Box component="section" marginBottom={5} data-testid="demands">
              <Box marginBottom={2}>
                <Text as="h3" variant="h3">
                  D??mkr??fur
                </Text>
              </Box>
              <Text>{workingCase.demands}</Text>
            </Box>
            <Box component="section" marginBottom={10}>
              <Accordion>
                <AccordionItem
                  labelVariant="h3"
                  id="id_2"
                  label="Laga??kv????i sem brot var??a vi??"
                >
                  <Text>
                    <span className={styles.breakSpaces}>
                      {workingCase.lawsBroken}
                    </span>
                  </Text>
                </AccordionItem>
                <AccordionItem
                  labelVariant="h3"
                  id="id_2"
                  label="Laga??kv????i sem krafan er bygg?? ??"
                >
                  {workingCase.custodyProvisions &&
                    workingCase.custodyProvisions.map(
                      (custodyProvision: CaseCustodyProvisions, index) => {
                        return (
                          <div key={index}>
                            <Text>{laws[custodyProvision]}</Text>
                          </div>
                        )
                      },
                    )}
                </AccordionItem>
                <AccordionItem
                  labelVariant="h3"
                  id="id_3"
                  label={`Takmarkanir og tilh??gun ${
                    workingCase.type === CaseType.CUSTODY ? 'g??slu' : 'farbanns'
                  }`}
                >
                  {formatRequestedCustodyRestrictions(
                    workingCase.type,
                    workingCase.requestedCustodyRestrictions,
                    workingCase.requestedOtherRestrictions,
                  )
                    .split('\n')
                    .map((requestedCustodyRestriction, index) => {
                      return (
                        <div key={index}>
                          <Text>{requestedCustodyRestriction}</Text>
                        </div>
                      )
                    })}
                </AccordionItem>
                <AccordionItem
                  labelVariant="h3"
                  id="id_4"
                  label="Greinarger?? um m??lsatvik og lagar??k"
                >
                  {workingCase.caseFacts && (
                    <Box marginBottom={2}>
                      <Box marginBottom={2}>
                        <Text variant="h5">M??lsatvik</Text>
                      </Box>
                      <Text>
                        <span className={styles.breakSpaces}>
                          {workingCase.caseFacts}
                        </span>
                      </Text>
                    </Box>
                  )}
                  {workingCase.legalArguments && (
                    <Box marginBottom={2}>
                      <Box marginBottom={2}>
                        <Text variant="h5">Lagar??k</Text>
                      </Box>
                      <Text>
                        <span className={styles.breakSpaces}>
                          {workingCase.legalArguments}
                        </span>
                      </Text>
                    </Box>
                  )}
                </AccordionItem>
                {(Boolean(workingCase.comments) ||
                  Boolean(workingCase.caseFilesComments)) && (
                  <AccordionItem
                    id="id_5"
                    label="Athugasemdir"
                    labelVariant="h3"
                  >
                    {Boolean(workingCase.comments) && (
                      <Box marginBottom={workingCase.caseFilesComments ? 3 : 0}>
                        <Box marginBottom={1}>
                          <Text variant="h4" as="h4">
                            Athugasemdir vegna m??lsme??fer??ar
                          </Text>
                        </Box>
                        <Text>
                          <span className={styles.breakSpaces}>
                            {workingCase.comments}
                          </span>
                        </Text>
                      </Box>
                    )}
                    {Boolean(workingCase.caseFilesComments) && (
                      <>
                        <Text variant="h4" as="h4">
                          Athugasemdir vegna ranns??knargagna
                        </Text>
                        <Text>
                          <span className={styles.breakSpaces}>
                            {workingCase.caseFilesComments}
                          </span>
                        </Text>
                      </>
                    )}
                  </AccordionItem>
                )}
                <AccordionItem
                  id="id_6"
                  label={`Ranns??knarg??gn ${`(${
                    workingCase.files ? workingCase.files.length : 0
                  })`}`}
                  labelVariant="h3"
                >
                  <Box marginY={3}>
                    <CaseFileList
                      caseId={workingCase.id}
                      files={workingCase.files ?? []}
                    />
                  </Box>
                </AccordionItem>
              </Accordion>
            </Box>
            <Box className={styles.prosecutorContainer}>
              <Text variant="h3">
                {workingCase.prosecutor
                  ? `${workingCase.prosecutor.name} ${workingCase.prosecutor.title}`
                  : `${user?.name} ${user?.title}`}
              </Text>
            </Box>
            <Box marginBottom={10}>
              <PdfButton
                caseId={workingCase.id}
                title="Opna PDF kr??fu"
                pdfType="request"
              />
            </Box>
          </FormContentContainer>
          <FormContentContainer isFooter>
            <FormFooter
              previousUrl={`${Constants.STEP_FIVE_ROUTE}/${workingCase.id}`}
              nextButtonText={
                workingCase.state === CaseState.NEW ||
                workingCase.state === CaseState.DRAFT
                  ? 'Senda kr??fu ?? h??ra??sd??m'
                  : 'Endursenda kr??fu ?? h??ra??sd??m'
              }
              nextIsLoading={isSendingNotification}
              onNextButtonClick={handleNextButtonClick}
            />
          </FormContentContainer>
          {modalVisible && (
            <Modal
              title={`Krafa um ${
                workingCase.type === CaseType.CUSTODY
                  ? 'g??sluvar??hald'
                  : 'farbann'
              }  hefur veri?? send til d??mst??ls`}
              text={modalText}
              handleClose={() => router.push(Constants.REQUEST_LIST_ROUTE)}
              handlePrimaryButtonClick={() => {
                window.open(Constants.FEEDBACK_FORM_URL, '_blank')
                router.push(Constants.REQUEST_LIST_ROUTE)
              }}
              handleSecondaryButtonClick={() => {
                router.push(Constants.REQUEST_LIST_ROUTE)
              }}
              primaryButtonText="Senda ??bendingu"
              secondaryButtonText="Loka glugga"
            />
          )}
        </>
      ) : null}
    </PageLayout>
  )
}

export default Overview
