import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { Box, Input, RadioButton, Text } from '@island.is/island-ui/core'
import {
  FormFooter,
  CourtDocuments,
  PageLayout,
  CaseNumbers,
  BlueBox,
  FormContentContainer,
  DateTime,
  HideableText,
} from '@island.is/judicial-system-web/src/shared-components'
import * as Constants from '@island.is/judicial-system-web/src/utils/constants'
import {
  capitalize,
  caseTypes,
  formatAccusedByGender,
  NounCases,
} from '@island.is/judicial-system/formatters'
import {
  AccusedPleaDecision,
  Case,
  CaseType,
} from '@island.is/judicial-system/types'
import { CaseQuery } from '@island.is/judicial-system-web/graphql'
import {
  CaseData,
  JudgeSubsections,
  Sections,
} from '@island.is/judicial-system-web/src/types'
import {
  validateAndSendToServer,
  removeTabsValidateAndSet,
  setAndSendToServer,
  newSetAndSendDateToServer,
} from '@island.is/judicial-system-web/src/utils/formHelper'
import { useCase } from '@island.is/judicial-system-web/src/utils/hooks'
import { validate } from '../../../../utils/validate'
import {
  accusedRights,
  rcCourtRecord,
} from '@island.is/judicial-system-web/messages'
import * as styles from './CourtRecord.treat'

export const CourtRecord: React.FC = () => {
  const [workingCase, setWorkingCase] = useState<Case>()
  const [
    courtRecordStartDateIsValid,
    setCourtRecordStartDateIsValid,
  ] = useState(true)
  const [courtAttendeesErrorMessage, setCourtAttendeesMessage] = useState('')
  const [prosecutorDemandsErrorMessage, setProsecutorDemandsMessage] = useState(
    '',
  )
  const [
    accusedPleaAnnouncementErrorMessage,
    setAccusedPleaAnnouncementMessage,
  ] = useState('')
  const [
    litigationPresentationsErrorMessage,
    setLitigationPresentationsMessage,
  ] = useState('')

  const router = useRouter()
  const { updateCase, autofill } = useCase()
  const { formatMessage } = useIntl()

  const id = router.query.id
  const { data, loading } = useQuery<CaseData>(CaseQuery, {
    variables: { input: { id: id } },
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    document.title = '??ingb??k - R??ttarv??rslug??tt'
  }, [])

  useEffect(() => {
    const defaultCourtAttendees = (wc: Case): string => {
      let attendees = ''

      if (wc.registrar) {
        attendees += `${wc.registrar.name} ${wc.registrar.title}\n`
      }

      if (wc.prosecutor && wc.accusedName) {
        attendees += `${wc.prosecutor.name} ${wc.prosecutor.title}\n${
          wc.accusedName
        } ${formatAccusedByGender(wc?.accusedGender)}`
      }

      if (wc.defenderName) {
        attendees += `\n${
          wc.defenderName
        } skipa??ur verjandi ${formatAccusedByGender(
          wc?.accusedGender,
          NounCases.GENITIVE,
        )}`
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

      if (theCase.type === CaseType.CUSTODY) {
        autofill(
          'litigationPresentations',
          `S??kjandi ??trekar kr??fu um g??sluvar??hald, reifar og r??ksty??ur kr??funa og leggur m??li?? ?? ??rskur?? me?? venjulegum fyrirvara.\n\nVerjandi ${formatAccusedByGender(
            theCase.accusedGender,
            NounCases.GENITIVE,
          )} ??trekar m??tm??li hans, krefst ??ess a?? kr??funni ver??i hafna??, til vara a?? ${formatAccusedByGender(
            theCase.accusedGender,
            NounCases.DATIVE,
          )} ver??i gert a?? s??ta farbanni ?? sta?? g??sluvar??halds, en til ??rautavara a?? g??sluvar??haldi ver??i marka??ur skemmri t??mi en krafist er og a?? ${formatAccusedByGender(
            theCase.accusedGender,
            NounCases.DATIVE,
          )} ver??i ekki gert a?? s??ta einangrun ?? me??an ?? g??sluvar??haldi stendur. Verjandinn reifar og r??ksty??ur m??tm??lin og leggur m??li?? ?? ??rskur?? me?? venjulegum fyrirvara.`,
          theCase,
        )
      }

      setWorkingCase(theCase)
    }
  }, [workingCase, updateCase, setWorkingCase, data, autofill])

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
      {workingCase ? (
        <>
          <FormContentContainer>
            <Box marginBottom={10}>
              <Text as="h1" variant="h1">
                ??ingb??k
              </Text>
            </Box>
            <Box component="section" marginBottom={7}>
              <Text variant="h2">{`M??l nr. ${workingCase.courtCaseNumber}`}</Text>
              <CaseNumbers workingCase={workingCase} />
            </Box>
            <Box component="section" marginBottom={8}>
              <Box marginBottom={3}>
                <DateTime
                  name="courtStartDate"
                  datepickerLabel="Dagsetning ??inghalds"
                  timeLabel="??inghald h??fst (kk:mm)"
                  maxDate={new Date()}
                  selectedDate={
                    workingCase.courtStartDate
                      ? new Date(workingCase.courtStartDate)
                      : new Date()
                  }
                  onChange={(date: Date | undefined, valid: boolean) => {
                    newSetAndSendDateToServer(
                      'courtStartDate',
                      date,
                      valid,
                      workingCase,
                      setWorkingCase,
                      setCourtRecordStartDateIsValid,
                      updateCase,
                    )
                  }}
                  required
                />
              </Box>
              <Box marginBottom={3}>
                <Input
                  data-testid="courtAttendees"
                  name="courtAttendees"
                  label="Vi??staddir og hlutverk ??eirra"
                  defaultValue={workingCase.courtAttendees}
                  placeholder="Skrifa h??r..."
                  onChange={(event) =>
                    removeTabsValidateAndSet(
                      'courtAttendees',
                      event,
                      ['empty'],
                      workingCase,
                      setWorkingCase,
                      courtAttendeesErrorMessage,
                      setCourtAttendeesMessage,
                    )
                  }
                  onBlur={(event) =>
                    validateAndSendToServer(
                      'courtAttendees',
                      event.target.value,
                      ['empty'],
                      workingCase,
                      updateCase,
                      setCourtAttendeesMessage,
                    )
                  }
                  errorMessage={courtAttendeesErrorMessage}
                  hasError={courtAttendeesErrorMessage !== ''}
                  textarea
                  rows={7}
                  required
                />
              </Box>
              <Input
                data-testid="prosecutorDemands"
                name="prosecutorDemands"
                label="Krafa"
                defaultValue={workingCase.prosecutorDemands}
                placeholder="Hva?? haf??i ??k??ruvaldi?? a?? segja?"
                onChange={(event) =>
                  removeTabsValidateAndSet(
                    'prosecutorDemands',
                    event,
                    ['empty'],
                    workingCase,
                    setWorkingCase,
                    prosecutorDemandsErrorMessage,
                    setProsecutorDemandsMessage,
                  )
                }
                onBlur={(event) =>
                  validateAndSendToServer(
                    'prosecutorDemands',
                    event.target.value,
                    ['empty'],
                    workingCase,
                    updateCase,
                    setProsecutorDemandsMessage,
                  )
                }
                errorMessage={prosecutorDemandsErrorMessage}
                hasError={prosecutorDemandsErrorMessage !== ''}
                textarea
                rows={7}
                required
              />
            </Box>
            <Box component="section" marginBottom={8}>
              <Box marginBottom={2}>
                <Text as="h3" variant="h3">
                  D??mskj??l
                </Text>
              </Box>
              <CourtDocuments
                title={`Krafa um ${caseTypes[workingCase.type]}`}
                tagText="??ingmerkt nr. 1"
                tagVariant="darkerBlue"
                text="Ranns??knarg??gn m??lsins liggja frammi."
                caseId={workingCase.id}
                selectedCourtDocuments={workingCase.courtDocuments ?? []}
                onUpdateCase={updateCase}
                setWorkingCase={setWorkingCase}
                workingCase={workingCase}
              />
            </Box>
            <Box component="section" marginBottom={8}>
              <Box marginBottom={1}>
                <Text as="h3" variant="h3">
                  {`${formatMessage(accusedRights.title, {
                    accusedType: formatAccusedByGender(
                      workingCase.accusedGender,
                      NounCases.GENITIVE,
                    ),
                  })} `}
                  <Text as="span" fontWeight="semiBold" color="red600">
                    *
                  </Text>
                </Text>
              </Box>
              <Box marginBottom={2}>
                <HideableText
                  text={formatMessage(accusedRights.text)}
                  isHidden={workingCase.isAccusedAbsent}
                  onToggleVisibility={(isVisible: boolean) =>
                    setAndSendToServer(
                      'isAccusedAbsent',
                      isVisible,
                      workingCase,
                      setWorkingCase,
                      updateCase,
                    )
                  }
                  tooltip={formatMessage(accusedRights.tooltip, {
                    accusedType: formatAccusedByGender(
                      workingCase.accusedGender,
                      NounCases.GENITIVE,
                    ),
                  })}
                />
              </Box>
              <BlueBox>
                <div className={styles.accusedPleaDecision}>
                  <RadioButton
                    name="accusedPleaDecision"
                    id="accused-plea-decision-rejecting"
                    label={formatMessage(
                      rcCourtRecord.sections.accusedAppealDecision.options
                        .reject,
                      {
                        accusedType: capitalize(
                          formatAccusedByGender(workingCase.accusedGender),
                        ),
                      },
                    )}
                    checked={
                      workingCase.accusedPleaDecision ===
                      AccusedPleaDecision.REJECT
                    }
                    onChange={() => {
                      setAndSendToServer(
                        'accusedPleaDecision',
                        AccusedPleaDecision.REJECT,
                        workingCase,
                        setWorkingCase,
                        updateCase,
                      )
                    }}
                    large
                    backgroundColor="white"
                  />
                  <RadioButton
                    name="accusedPleaDecision"
                    id="accused-plea-decision-accepting"
                    label={formatMessage(
                      rcCourtRecord.sections.accusedAppealDecision.options
                        .accept,
                      {
                        accusedType: capitalize(
                          formatAccusedByGender(workingCase.accusedGender),
                        ),
                      },
                    )}
                    checked={
                      workingCase.accusedPleaDecision ===
                      AccusedPleaDecision.ACCEPT
                    }
                    onChange={() => {
                      setAndSendToServer(
                        'accusedPleaDecision',
                        AccusedPleaDecision.ACCEPT,
                        workingCase,
                        setWorkingCase,
                        updateCase,
                      )
                    }}
                    large
                    backgroundColor="white"
                  />
                </div>
                <Input
                  data-testid="accusedPleaAnnouncement"
                  name="accusedPleaAnnouncement"
                  label={`Afsta??a ${formatAccusedByGender(
                    workingCase.accusedGender,
                    NounCases.GENITIVE,
                  )}`}
                  defaultValue={workingCase.accusedPleaAnnouncement}
                  placeholder={formatMessage(
                    rcCourtRecord.sections.accusedPleaAnnouncement.placeholder,
                  )}
                  onChange={(event) =>
                    removeTabsValidateAndSet(
                      'accusedPleaAnnouncement',
                      event,
                      [],
                      workingCase,
                      setWorkingCase,
                      accusedPleaAnnouncementErrorMessage,
                      setAccusedPleaAnnouncementMessage,
                    )
                  }
                  onBlur={(event) =>
                    validateAndSendToServer(
                      'accusedPleaAnnouncement',
                      event.target.value,
                      [],
                      workingCase,
                      updateCase,
                      setAccusedPleaAnnouncementMessage,
                    )
                  }
                  errorMessage={accusedPleaAnnouncementErrorMessage}
                  hasError={accusedPleaAnnouncementErrorMessage !== ''}
                  textarea
                  rows={7}
                />
              </BlueBox>
            </Box>
            <Box component="section" marginBottom={8}>
              <Box marginBottom={2}>
                <Text as="h3" variant="h3">
                  M??lflutningur
                </Text>
              </Box>
              <Box marginBottom={3}>
                <Input
                  data-testid="litigationPresentations"
                  name="litigationPresentations"
                  label="M??lflutningur og a??rar b??kanir"
                  defaultValue={workingCase.litigationPresentations}
                  placeholder="M??lflutningsr????ur og anna?? sem fram kom ?? ??inghaldi er skr???? h??r..."
                  onChange={(event) =>
                    removeTabsValidateAndSet(
                      'litigationPresentations',
                      event,
                      ['empty'],
                      workingCase,
                      setWorkingCase,
                      litigationPresentationsErrorMessage,
                      setLitigationPresentationsMessage,
                    )
                  }
                  onBlur={(event) =>
                    validateAndSendToServer(
                      'litigationPresentations',
                      event.target.value,
                      ['empty'],
                      workingCase,
                      updateCase,
                      setLitigationPresentationsMessage,
                    )
                  }
                  errorMessage={litigationPresentationsErrorMessage}
                  hasError={litigationPresentationsErrorMessage !== ''}
                  textarea
                  rows={7}
                  required
                />
              </Box>
            </Box>
          </FormContentContainer>
          <FormContentContainer isFooter>
            <FormFooter
              previousUrl={`${Constants.HEARING_ARRANGEMENTS_ROUTE}/${workingCase.id}`}
              nextUrl={`${Constants.RULING_STEP_ONE_ROUTE}/${id}`}
              nextIsDisabled={
                !courtRecordStartDateIsValid ||
                !validate(workingCase.courtAttendees ?? '', 'empty').isValid ||
                !validate(workingCase.prosecutorDemands ?? '', 'empty')
                  .isValid ||
                !validate(workingCase.litigationPresentations ?? '', 'empty')
                  .isValid ||
                !workingCase.accusedPleaDecision
              }
            />
          </FormContentContainer>
        </>
      ) : null}
    </PageLayout>
  )
}

export default CourtRecord
