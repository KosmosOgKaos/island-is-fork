import {
  Application,
  buildCheckboxField,
  buildForm,
  buildDescriptionField,
  buildMultiField,
  buildRadioField,
  buildSection,
  buildExternalDataProvider,
  buildSubmitField,
  buildSubSection,
  buildDataProviderItem,
  buildTextField,
  Comparators,
  Form,
  FormModes,
  FormValue,
  buildFileUploadField,
  buildCustomField,
  buildSelectField,
  buildDateField,
  buildKeyValueField,
  buildDividerField,

} from '@island.is/application/core'
import { ApiActions } from '../shared'
import { m } from '../lib/messages'
import { NationalRegistryGetPerson } from '../types/schema'

export const application: Form = buildForm({
  id: 'ExampleFormDraft',
  title: 'Atvinnuleysisbætur',
  mode: FormModes.APPLYING,
  children: [
    buildSection({
      id: 'externalData',
      title: m.conditionsSection,
      children: [
        buildExternalDataProvider({
          id: 'approveExternalData',
          title: 'Utanaðkomandi gögn',
          dataProviders: [
            buildDataProviderItem({
              id: 'nationalRegistry',
              type: 'NationalRegistryDataProvider',
              title: 'Þjóðskrá',
              subTitle: 'Þessi umsókn krefst uppfléttingar í þjóðskrá.',
            }),
          ],
        }),
      ],
    }),
    buildSection({
      id: 'intro',
      title: m.introSection,
      children: [
        buildDescriptionField({
          id: 'field',
          title: m.introField,
          description: (application) => ({
            ...m.introIntroduction,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            values: { name: application.answers.name },
          }),
        }),
        buildSubSection({
          id: 'personsub',
          title: m.about,
          children: [
            buildMultiField({
              id: 'person',
              title: m.about,
              children: [
                // TODO: Autofill with national registry
                buildTextField({
                  id: 'person.name',
                  title: m.name,
                  defaultValue: ({ externalData }: any) =>
                  (externalData?.nationalRegistry.data as NationalRegistryGetPerson).name
                }),
                buildTextField({
                  id: 'person.nationalId',
                  title: m.nationalId,
                  width: 'half',
                  defaultValue: ({ externalData }: any) =>
                  (externalData?.nationalRegistry.data as NationalRegistryGetPerson).nationalId
                }),
                buildTextField({
                  id: 'person.phoneNumber',
                  title: m.phoneNumber,
                  width: 'half',
                  defaultValue: ({ externalData }: any) =>
                  (externalData?.nationalRegistry.data as NationalRegistryGetPerson).phoneNumber
                }),
                buildTextField({
                  id: 'person.email',
                  title: m.email,
                  width: 'half',
                  defaultValue: ({ externalData }: any) =>
                  (externalData?.nationalRegistry.data as NationalRegistryGetPerson).email
                }),
                buildTextField({
                  id: 'person.address',
                  title: m.address,
                  width: 'half',
                  defaultValue: ({ externalData }: any) =>
                  (externalData?.nationalRegistry.data as NationalRegistryGetPerson).address
                }),
                buildTextField({
                  id: 'person.partnerNationalId',
                  title: m.partnerId,
                  width: 'half',
                  required: false,
                  defaultValue: ({ externalData }: any) =>
                  (externalData?.nationalRegistry.data as NationalRegistryGetPerson).partnerNationalId
                }),
                buildTextField({
                  id: 'person.childrenNationalId',
                  title: m.childId,
                  width: 'half',
                  defaultValue: ({ externalData }: any) =>
                  (externalData?.nationalRegistry.data as NationalRegistryGetPerson).childrenNationalId[0]
                }),
                buildTextField({
                  id: 'person.childrenNationalId',
                  title: m.childId,
                  width: 'half',
                  defaultValue: ({ externalData }: any) =>
                  (externalData?.nationalRegistry.data as NationalRegistryGetPerson).childrenNationalId[1],
                }),
              ],
            }),
          ],
        }),
        buildSubSection({
          id: 'ecomm',
          title: 'Rafræn samskipti',
          children: [
            buildMultiField({
              id: 'communication',
              title: 'Rafræn samskipti',
              children: [
                buildDescriptionField({
                  id: 'overview',
                  title: '',
                  description:
                    'Í því skyni að bæta þjónustu Vinnumálastofnunar og hraða afgreiðslu þinna mála stendur þér til boða að stofnunin birti ákvarðanir og önnur bréf til þín á „Mínum síðum“. Þá verður þér sendur tölvupóstur þar sem þér er tilkynnt um að nýtt bréf eða ákvörðun frá stofnuninni sé aðgengilegt á „Mínum síðum“. Þú getur þá jafnframt svarað þeim bréfum sem þér berst með rafrænum hætti á vefsvæðinu.',
                }),
                buildTextField({
                  id: 'secretWord',
                  title: 'Leyniorð símasamskipti',
                  width: 'half',
                }),
                buildRadioField({
                  id: 'getPaperCopy',
                  title: '',
                  options: [
                    {
                      value: 'yes',
                      label:
                        'Ég óska eftir að ákvarðanir og önnur bréf frá Vinnumálastofnun séu send mér með hefðbundnum bréfpósti.',
                    },
                    {
                      value: 'no',
                      label: 'Ég óska eftir rafrænum samskiptum',
                    },
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    buildSection({
      id: 'payments',
      title: 'Fjármálaupplýsingar',
      children: [
        buildSubSection({
          id: 'paymentsinfo',
          title: 'Greiðslu upplýsingar',
          children: [
            buildMultiField({
              title: m.paymentInformationName,
              id: 'paymentscard',
              children: [
                buildTextField({
                  title: 'Mánaðarlegar tekjur',
                  id: 'monthlyIncome',
                }),
                buildTextField({
                  id: 'personalTaxCreditRatio',
                  title: 'Nýting persónuafslátts',
                  format: '###%',
                  width: 'half',
                }),
                buildTextField({
                  id: 'personalTaxCreditMonthlyAmount',
                  title: 'Persónuafsláttur 2021',
                  format: '##.###',
                  defaultValue: '50792',
                  disabled: true,
                  width: 'half',
                }),
                buildTextField({
                  id: 'incomeStepOne',
                  title: 'Tekjuskattur þrep 1',
                  defaultValue: '0.3145',
                  disabled: true,
                  width: 'half',
                }),
                buildTextField({
                  id: 'incomeStepTwo',
                  title: 'Tekjuskattur þrep 2',
                  defaultValue: '0.3795',
                  disabled: true,
                  width: 'half',
                }),
                buildTextField({
                  id: 'insurancePayments',
                  title:
                    'Elli- eða örorkulífeyrisgreiðslur frá Tryggingastofnun',
                }),
                buildTextField({
                  id: 'pensionPayments',
                  title:
                    'Elli- og örorkulífeyrisgreiðslur úr almennum lífeyrissjóðum',
                }),
                buildRadioField({
                  id: 'onParentalLeave',
                  title: 'Ertu í fæðingarorlofi?',
                  largeButtons: false,
                  options: [
                    {
                      value: 'yes',
                      label: m.yesOptionLabel,
                    },
                    {
                      value: 'no',
                      label: m.noOptionLabel,
                    },
                  ],
                }),
              ],
            }),
          ],
        }),
        buildSubSection({
          id: 'paymentsinfofunds',
          title: 'Sjóðir og félög',
          children: [
            buildMultiField({
              title: 'Sjóðir og félög',
              id: 'paymentsfunds',
              children: [
                buildTextField({
                  title: m.paymentInformationBank,
                  id: 'payments.bank',
                  format: '####-##-######',
                  placeholder: '0000-00-000000',
                }),
                buildSelectField({
                  id: 'payments.pensionFund',
                  title: m.pensionFund,
                  options: [
                    { label: 'Frjálsi', value: 'Frjalsi' },
                    { label: 'Brú', value: 'bru' },
                  ],
                  width: 'half',
                }),
                buildSelectField({
                  id: 'payments.pensionFundPercentage',
                  title: 'Lífeyrissjóður hlutfall',
                  options: [
                    { label: '2%', value: '2' },
                    { label: '4%', value: '4' },
                  ],
                  width: 'half',
                }),
                buildSelectField({
                  id: 'payments.privatePensionFund',
                  title: 'Viðbótarlífyerissjóður',
                  options: [
                    { label: 'VR', value: 'VR' },
                    { label: 'Efling', value: 'Efling' },
                  ],
                  width: 'half',
                }),
                buildSelectField({
                  id: 'payments.privatePensionFundPercentage',
                  title: 'Lífeyrissjóður hlutfall',
                  options: [
                    { label: '0%', value: '0' },
                    { label: '1%', value: '1' },
                  ],
                  width: 'half',
                }),
                buildSelectField({
                  id: 'payments.union',
                  title: 'Stéttarfélag',
                  options: [
                    { label: 'VR', value: 'VR' },
                    { label: 'Efling', value: 'Efling' },
                  ],
                  width: 'half',
                }),
                buildSelectField({
                  id: 'payments.unionPercentage',
                  title: 'Stéttarfélag hlutfall',
                  options: [
                    { label: '0%', value: '0' },
                    { label: '2%', value: '2' },
                  ],
                  width: 'half',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    buildSection({
      id: 'employment',
      title: 'Starf',
      children: [
        buildMultiField({
          id: 'emp',
          title: 'Fyrri störf',
          children: [
            buildSelectField({
              id: 'employment.employmentStatus',
              title: 'Aðstæður umsækjanda',
              options: [
                { value: 'Launþegi', label: 'Launþegi' },
                {
                  value: 'Sjálfstætt starfandi',
                  label: 'Sjálfstætt starfandi',
                },
              ],
              width: 'half',
            }),
            buildTextField({
              id: 'employment.employmentRatio',
              title: 'Starfshlutfall',
              format: '###%',
              width: 'half',
            }),
            buildTextField({
              id: 'employment.employerName',
              title: 'Nafn vinnuveitenda',
              width: 'half',
              condition: (answers) => (answers.employment as any)?.employmentStatus === 'Launþegi'
            }),
            buildTextField({
              id: 'employment.employerEmail',
              title: m.email,
              width: 'half',
              condition: (answers) => (answers.employment as any)?.employmentStatus === 'Launþegi'
            }),
            buildDateField({
              id: 'employment.startDate',
              title: 'Störf hafin',
              width: 'half',
              condition: (answers) => (answers.employment as any)?.employmentStatus === 'Launþegi'
            }),
            buildDateField({
              id: 'employment.endDate',
              title: 'Störfum lokið',
              width: 'half',
              condition: (answers) => (answers.employment as any)?.employmentStatus === 'Launþegi'
            })
          ]
        }),
      ]
    }),
    buildSection({
      id: 'confirmation',
      title: 'Staðfesta',
      children: [
        buildMultiField({
          title: '',
          children: [
            buildSubmitField({
              id: 'submit',
              placement: 'footer',
              title: 'Senda inn umsókn',
              actions: [
                { event: 'SUBMIT', name: 'Senda inn umsókn', type: 'primary' },
              ],
            }),
            buildDescriptionField({
              id: 'overview',
              title: 'Takk fyrir að sækja um atvinnuleysisbætur',
              description:
                'Vinsamlegast athugaðu hvort allar upplýsingar séu rétt skráðar. Með því að smella á "Senda" hér að neðan, þá sendist umsóknin inn til úrvinnslu. Við látum þig vita þegar hún er samþykkt eða henni er hafnað.',
            }),
            buildDividerField({}),
            buildKeyValueField({
              label: 'Nafn',
              width: 'half',
              value: (app) => (app.answers.person as any)?.name
            }),
            buildKeyValueField({
              label: 'Kennitala',
              width: 'half',
              value: (app) => (app.answers.person as any)?.nationalId
            }),
            buildKeyValueField({
              label: 'Netfang',
              width: 'half',
              value: (app) => (app.answers.person as any)?.email
            }),
            buildKeyValueField({
              label: 'Heimilisfang',
              width: 'half',
              value: (app) => (app.answers.person as any)?.address
            }),
            buildKeyValueField({
              label: 'Kennitala maka',
              width: 'half',
              value: (app) => (app.answers.person as any)?.partnerNationalId
            }),
            buildKeyValueField({
              label: 'Kennitala barns',
              width: 'half',
              value: (app) => (app.answers.person as any)?.childrenNationalId
            }),
            buildDividerField({}),
            buildKeyValueField({
              label: 'Má eiga rafræn samskipti við þig?',
              width: 'half',
              value: (app) => (app.answers as any)?.getPaperCopy === 'yes' ? m.yesOptionLabel : m.noOptionLabel 
            }),
            buildKeyValueField({
              label: 'Leyniorð',
              width: 'half',
              value: (app) => (app.answers as any)?.secretWord
            }),
            buildDividerField({}),
            
          ],
        }),
        buildDescriptionField({
          id: 'final',
          title: 'Takk',
          description: (application) => {
            const sendApplicationActionResult =
              application.externalData[ApiActions.createApplication]

            let id = 'unknown'
            if (sendApplicationActionResult) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              id = sendApplicationActionResult.data.id
            }

            return {
              ...m.outroMessage,
              values: {
                id,
              },
            }
          },
        }),
      ],
    }),
  ],
})
