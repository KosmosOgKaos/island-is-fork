import { defineMessage, defineMessages } from 'react-intl'

export const defendant = {
  heading: defineMessage({
    id: 'judicial.system.investigation_cases:defendant.heading',
    defaultMessage: 'Rannsóknarheimild',
    description:
      'Notaður sem titill á sakbornings skrefi í rannsóknarheimildum.',
  }),
  receivedAlert: defineMessages({
    title: {
      id: 'judicial.system.investigation_cases:defendant.received_alert.title',
      defaultMessage: 'Athugið',
      description:
        'Notaður sem titill í upplýsingarboxi á varnaraðila skrefi í rannsóknarheimildum.',
    },
    message: {
      id:
        'judicial.system.investigation_cases:defendant.received_alert.message',
      defaultMessage:
        'Hægt er að breyta efni kröfunnar og bæta við rannsóknargögnum eftir að hún hefur verið send dómstól en til að breytingar skili sér í dómskjalið sem verður til hliðsjónar í þinghaldinu þarf að smella á Endursenda kröfu á skjánum Yfirlit kröfu.',
      description:
        'Notaður sem skilaboð í upplýsingarboxi á varnaraðila skrefi í rannsóknarheimildum.',
    },
  }),
  sections: {
    investigationType: {
      heading: defineMessage({
        id:
          'judicial.system.investigation_cases:defendant.investigation_type.heading',
        defaultMessage: 'Efni kröfu',
        description:
          'Notaður sem titill fyrir "efni kröfu" hlutanum á varnaraðila skrefi í rannsóknarheimildum.',
      }),
      type: defineMessages({
        label: {
          id:
            'judicial.system.investigation_cases:defendant.investigation_type.type.label',
          defaultMessage: 'Tegund kröfu',
          description:
            'Notaður sem titill í "tegund kröfu" listanum á varnaraðila skrefi í rannsóknarheimildum.',
        },
        placeholder: {
          id:
            'judicial.system.investigation_cases:defendant.investigation_type.type.placeholder',
          defaultMessage: 'Veldu tegund kröfu',
          description:
            'Notaður sem skýritexti í "tegund kröfu" listanum á varnaraðila skrefi í rannsóknarheimildum.',
        },
      }),
      description: defineMessages({
        label: {
          id:
            'judicial.system.investigation_cases:defendant.investigation_type.description.label',
          defaultMessage: 'Efni kröfu',
          description:
            'Notaður sem titill í "efni kröfu" textaboxi á varnaraðila skrefi í rannsóknarheimildum.',
        },
        placeholder: {
          id:
            'judicial.system.investigation_cases:defendant.investigation_type.description.placeholder',
          defaultMessage: 'Veldu tegund kröfu',
          description:
            'Notaður sem skýritexti í "efni kröfu" textaboxi á varnaraðila skrefi í rannsóknarheimildum.',
        },
      }),
    },
    defendantInfo: {
      heading: defineMessage({
        id:
          'judicial.system.investigation_cases:defendant.defendant_info.heading',
        defaultMessage: 'Varnaraðili',
        description:
          'Notaður sem titill fyrir "upplýsingar um varnaraðila" hlutann á varnaraðila skrefi í rannsóknarheimildum.',
      }),
    },
  },
}
