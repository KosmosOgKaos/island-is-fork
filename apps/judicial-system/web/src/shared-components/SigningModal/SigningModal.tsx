import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import {
  Case,
  CaseDecision,
  CaseState,
  CaseTransition,
  CaseType,
  NotificationType,
  RequestSignatureResponse,
  SignatureConfirmationResponse,
} from '@island.is/judicial-system/types'
import { useCase } from '../../utils/hooks'
import { SignatureConfirmationQuery } from '../../utils/mutations'
import { Box, Text } from '@island.is/island-ui/core'
import { useQuery } from '@apollo/client'
import { Modal } from '..'
import {
  icConfirmation,
  rcConfirmation,
} from '@island.is/judicial-system-web/messages'
import * as Constants from '@island.is/judicial-system-web/src/utils/constants'

interface SigningModalProps {
  workingCase: Case
  setWorkingCase: React.Dispatch<React.SetStateAction<Case | undefined>>
  requestSignatureResponse?: RequestSignatureResponse
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const SigningModal: React.FC<SigningModalProps> = ({
  workingCase,
  setWorkingCase,
  requestSignatureResponse,
  setModalVisible,
}) => {
  const router = useRouter()
  const [
    signatureConfirmationResponse,
    setSignatureConfirmationResponse,
  ] = useState<SignatureConfirmationResponse>()

  const { transitionCase, sendNotification } = useCase()
  const { formatMessage } = useIntl()

  const { data } = useQuery(SignatureConfirmationQuery, {
    variables: {
      input: {
        caseId: workingCase.id,
        documentToken: requestSignatureResponse?.documentToken,
      },
    },
    fetchPolicy: 'no-cache',
  })

  // TODO: Handle case when resSignatureConfirmationResponse is never set
  const resSignatureConfirmationResponse = data?.signatureConfirmation

  useEffect(() => {
    const completeSigning = async (
      resSignatureConfirmationResponse: SignatureConfirmationResponse,
    ) => {
      if (resSignatureConfirmationResponse.documentSigned) {
        try {
          const caseCompleted =
            workingCase.state === CaseState.RECEIVED
              ? await transitionCase(
                  workingCase,
                  workingCase.decision === CaseDecision.REJECTING
                    ? CaseTransition.REJECT
                    : CaseTransition.ACCEPT,
                  setWorkingCase,
                )
              : workingCase.state === CaseState.REJECTED ||
                workingCase.state === CaseState.ACCEPTED

          if (caseCompleted) {
            await sendNotification(workingCase.id, NotificationType.RULING)
          } else {
            // TODO: Handle error
          }
        } catch (e) {
          // TODO: Handle error
        }
      }

      setSignatureConfirmationResponse(resSignatureConfirmationResponse)
    }

    if (resSignatureConfirmationResponse) {
      completeSigning(resSignatureConfirmationResponse)
    }
  }, [
    resSignatureConfirmationResponse,
    setSignatureConfirmationResponse,
    transitionCase,
    sendNotification,
    workingCase,
    setWorkingCase,
  ])

  const renderControlCode = () => {
    return (
      <>
        <Box marginBottom={2}>
          <Text variant="h2" color="blue400">
            {`??ryggistala: ${requestSignatureResponse?.controlCode}`}
          </Text>
        </Box>
        <Text>
          ??etta er ekki pin-n??meri??. Sta??festu a??eins innskr??ningu ef sama
          ??ryggistala birtist ?? s??manum ????num.
        </Text>
      </>
    )
  }

  const renderSuccessText = (caseType: CaseType) => {
    return caseType === CaseType.CUSTODY || caseType === CaseType.TRAVEL_BAN
      ? formatMessage(rcConfirmation.modal.text)
      : formatMessage(icConfirmation.modal.text)
  }

  return (
    <Modal
      title={
        !signatureConfirmationResponse
          ? 'Rafr??n undirritun'
          : signatureConfirmationResponse.documentSigned
          ? '??rskur??ur hefur veri?? sta??festur og undirrita??ur'
          : signatureConfirmationResponse.code === 7023 // User cancelled
          ? 'Notandi h??tti vi?? undirritun'
          : 'Undirritun t??kst ekki'
      }
      text={
        !signatureConfirmationResponse
          ? renderControlCode()
          : signatureConfirmationResponse.documentSigned
          ? renderSuccessText(workingCase.type)
          : 'Vinsamlegast reyni?? aftur svo h??gt s?? a?? senda ??rskur??inn me?? undirritun.'
      }
      secondaryButtonText={
        !signatureConfirmationResponse
          ? undefined
          : signatureConfirmationResponse.documentSigned
          ? 'Loka glugga'
          : 'Loka og reyna aftur'
      }
      primaryButtonText={signatureConfirmationResponse ? 'Senda ??bendingu' : ''}
      handlePrimaryButtonClick={() => {
        window.open(Constants.FEEDBACK_FORM_URL, '_blank')
        router.push(Constants.REQUEST_LIST_ROUTE)
      }}
      handleSecondaryButtonClick={async () => {
        if (signatureConfirmationResponse?.documentSigned === true) {
          router.push(Constants.REQUEST_LIST_ROUTE)
        } else {
          setModalVisible(false)
        }
      }}
    />
  )
}

export default SigningModal
