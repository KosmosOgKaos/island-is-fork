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
} from '@island.is/application/core'
import { ApiActions } from '../shared'
import { m } from '../lib/messages'
import get from 'lodash/get'

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
              id: 'sampleData',
              type: 'SampleDataProvider',
              title: 'Staðfesting á ákveðnu atriði',
              subTitle:
                'Sækja þarf gögn frá Þjóðskrá og atvinnumálastofnun',
            }),
          ],
        }),
        buildMultiField({
          id: 'externalDataSuccess',
          title: 'Tókst að sækja gögn',
          children: [
            buildDescriptionField({
              id: 'externalDataSuccessDescription',
              title: '',
              description: (application: Application) =>
                `Gildið frá data provider: ${get(
                  application.externalData,
                  'sampleData.data.fullName',
                  'fannst ekki',
                )}`,
            }),
            buildSubmitField({
              id: 'toDraft',
              placement: 'footer',
              title: 'Hefja umsókn',
              refetchApplicationAfterSubmit: true,
              actions: [
                {
                  event: 'SUBMIT',
                  name: 'Hefja umsókn',
                  type: 'primary',
                },
              ],
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
        buildMultiField({
          id: 'about',
          title: m.about,
          children: [
            buildTextField({
              id: 'person.name',
              title: m.name,
            }),
            buildTextField({
              id: 'person.nationalId',
              title: m.nationalId,
              width: 'half',
            }),
            buildTextField({
              id: 'person.age',
              title: m.age,
              width: 'half',
            }),
            buildTextField({
              id: 'person.email',
              title: m.email,
              width: 'half',
            }),
            buildTextField({
              id: 'person.phoneNumber',
              title: m.phoneNumber,
              width: 'half',
              condition: {
                questionId: 'person.age',
                isMultiCheck: false,
                comparator: Comparators.GTE,
                value: '18',
              },
            }),
          ],
        }),
        buildFileUploadField({
          id: 'attachments',
          title: 'Viðhengi',
          introduction: 'Hér getur þú bætt við viðhengjum við umsóknina þína.',
          uploadMultiple: true,
        }),
      ],
    }),
    buildSection({
      id: 'career',
      title: m.career,
      children: [
        buildSubSection({
          id: 'history',
          title: m.history,
          children: [
            buildRadioField({
              id: 'careerHistory',
              title: m.careerHistory,
              options: [
                { value: 'yes', label: m.yesOptionLabel },
                { value: 'no', label: m.noOptionLabel },
              ],
              condition: (formValue: FormValue) => {
                return (
                  (formValue as { person: { age: string } })?.person?.age >=
                  '18'
                )
              },
            }),
            buildCheckboxField({
              id: 'careerHistoryCompanies',
              title: m.careerHistoryCompanies,
              options: [
                { value: 'government', label: m.governmentOptionLabel },
                { value: 'aranja', label: 'Aranja' },
                { value: 'advania', label: 'Advania' },
              ],
            }),
          ],
        }),
        buildSubSection({
          id: 'future',
          title: m.future,
          children: [
            buildTextField({
              id: 'dreamJob',
              title: m.dreamJob,
            }),
          ],
        }),
      ],
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
              title: 'Takk fyrir að sækja um',
              description:
                'Með því að smella á "Senda" hér að neðan, þá sendist umsóknin inn til úrvinnslu. Við látum þig vita þegar hún er samþykkt eða henni er hafnað.',
            }),
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
