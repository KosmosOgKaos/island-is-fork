import React, { FC, useState } from 'react'
import { Colors } from '@island.is/island-ui/theme'
import { Box, Text, Icon } from '@island.is/island-ui/core'
import * as styles from './AlertBanner.treat'

export type AlertBannerVariants =
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | 'default'

type VariantStyle = {
  background: Colors
  borderColor: Colors
  iconColor?: Colors
  icon?: any
}

type VariantStyles = {
  [Type in AlertBannerVariants]: VariantStyle
}

const variantStyles: VariantStyles = {
  default: {
    background: 'purple100',
    borderColor: 'purple200',
  },
  error: {
    background: 'red100',
    borderColor: 'red200',
    iconColor: 'red400',
    icon: 'alert',
  },
  info: {
    background: 'blue100',
    borderColor: 'blue200',
    iconColor: 'blue400',
    icon: 'info',
  },
  success: {
    background: 'mint100',
    borderColor: 'mint200',
    iconColor: 'mint400',
    icon: 'check',
  },
  warning: {
    background: 'yellow200',
    borderColor: 'yellow400',
    iconColor: 'yellow600',
    icon: 'alert',
  },
}

export interface AlertBannerProps {
  variant?: AlertBannerVariants
  /**
   * Adds close button in corner to remove banner
   */
  dismissable?: boolean
  title?: string
  description?: string
  link?: {
    href: string
    title: string
  }
  /**
   * Fires when banner gets dismissed, usefull for keeping track in storage that the user has dismissed the banner if we don't want it to show up again on page reload
   */
  onDismiss?: () => void
}

export const AlertBanner: FC<AlertBannerProps> = ({
  variant: variantKey = 'default',
  dismissable,
  title,
  description,
  link,
  onDismiss,
}) => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) {
    return null
  }

  const variant = variantStyles[variantKey]
  return (
    <Box
      background={variant.background}
      borderColor={variant.borderColor}
      paddingLeft={[3, 3, 3, 6]}
      paddingRight={[3, 3, 3, 6]}
      paddingY={2}
      borderBottomWidth="standard"
      display="flex"
      alignItems={['flexStart', 'flexStart', 'flexStart', 'center']}
      position="relative"
      flexDirection={['column', 'column', 'column', 'row']}
    >
      {variant.icon && (
        <Box
          display="flex"
          marginRight={[0, 0, 0, 2]}
          marginBottom={[2, 2, 2, 0]}
        >
          <Icon icon="warning" color="red400" size="large" />
        </Box>
      )}
      {title && (
        <Box marginRight={[0, 0, 0, 2]} marginBottom={[1, 1, 1, 0]}>
          <Text variant="h4">{title}</Text>
        </Box>
      )}
      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection={['column', 'column', 'column', 'row']}
      >
        {(description || link) && (
          <Box marginRight={[0, 0, 0, 2]} marginBottom={[1, 1, 1, 0]}>
            <Text>
              {description}
              {description && link && ` `}
              {link && (
                <span className={styles.link}>
                  <a href={link.href}>{link.title}</a>
                </span>
              )}
            </Text>
          </Box>
        )}
      </Box>
      {dismissable && (
        <Box
          display="flex"
          alignItems="flexEnd"
          flexDirection="column"
          flexGrow={1}
        >
          <button
            onClick={() => {
              setDismissed(true)
              if (onDismiss) {
                onDismiss()
              }
            }}
          >
            <Icon icon="close" color="dark400" />
          </button>
        </Box>
      )}
    </Box>
  )
}
export default AlertBanner