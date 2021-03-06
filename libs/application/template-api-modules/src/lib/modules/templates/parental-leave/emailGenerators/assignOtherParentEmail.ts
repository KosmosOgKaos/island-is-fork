import get from 'lodash/get'

import { ApplicationConfigurations } from '@island.is/application/core'
import { Message } from '@island.is/email-service'

import { EmailTemplateGenerator } from '../../../../types'
import { pathToAsset } from '../parental-leave.utils'

// TODO handle translations
export const generateAssignOtherParentApplicationEmail: EmailTemplateGenerator = (
  props,
): Message => {
  const {
    application,
    options: { email, clientLocationOrigin },
  } = props

  const otherParentEmail = get(application.answers, 'otherParentEmail')

  if (!otherParentEmail) {
    throw new Error('Could not find other parent email')
  }

  const subject = 'Yfirferð á umsókn um fæðingarorlof'

  return {
    from: {
      name: email.sender,
      address: email.address,
    },
    to: [
      {
        name: '',
        address: otherParentEmail as string,
      },
    ],
    subject,
    template: {
      title: subject,
      body: [
        {
          component: 'Image',
          context: {
            src: pathToAsset('logo.jpg'),
            alt: 'Vinnumálastofnun merki',
          },
        },
        {
          component: 'Image',
          context: {
            src: pathToAsset('child.jpg'),
            alt: 'Barn myndskreyting',
          },
        },
        { component: 'Heading', context: { copy: subject } },
        { component: 'Copy', context: { copy: 'Góðan dag.' } },
        {
          component: 'Copy',
          context: {
            copy: `Umsækjandi með kennitölu ${application.applicant} hefur skráð þig sem foreldri í umsókn sinni og er að óska eftir réttindum frá þér.`,
          },
        },
        {
          component: 'Copy',
          context: {
            copy: `Ef þú áttir von á þessum tölvupósti þá getur þú smellt á takkann hér fyrir neðan.`,
          },
        },
        {
          component: 'Button',
          context: {
            copy: 'Skoða umsókn',
            href: `${clientLocationOrigin}/${ApplicationConfigurations.ParentalLeave.slug}/${application.id}`,
          },
        },
      ],
    },
  }
}
