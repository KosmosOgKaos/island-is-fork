import React from 'react'
import {
  Columns,
  Column,
  Text,
  Stack,
  Input,
  Button,
} from '@island.is/island-ui/core'

export interface EmailSignupProps {
  title: string
  description?: string
  inputLabel: string
  buttonText: string
}

export const EmailSignup = ({
  title,
  description,
  inputLabel,
  buttonText,
}: EmailSignupProps) => {
  return (
    <Stack space={4}>
      <div>
        <Text variant="h3" as="h3" color="blue400">
          {title}
        </Text>
        {description && <Text>{description}</Text>}
      </div>
      <Columns alignY="center" space={[2, 2, 8]} collapseBelow="md">
        <Column>
          <Input name="email" label={inputLabel} />
        </Column>
        <Column width="content">
          <Button variant="text">{buttonText}</Button>
        </Column>
      </Columns>
    </Stack>
  )
}

export default EmailSignup
