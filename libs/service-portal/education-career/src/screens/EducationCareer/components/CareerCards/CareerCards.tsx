import React from 'react'
import { gql, useQuery } from '@apollo/client'

import { Box, Button, SkeletonLoader, Text } from '@island.is/island-ui/core'
import { Link } from 'react-router-dom'
import { Query } from '@island.is/api/schema'
import {
  ServicePortalPath,
  EducationCard,
  EmptyState,
  m,
} from '@island.is/service-portal/core'
import * as styles from './CareerCards.treat'
import { useLocale } from '@island.is/localization'

const EducationExamFamilyOverviewsQuery = gql`
  query EducationExamFamilyOverviewsQuery {
    educationExamFamilyOverviews {
      nationalId
      name
      isChild
      organizationType
      organizationName
      yearInterval
    }
  }
`

const CareerCards = () => {
  const { data, loading } = useQuery<Query>(EducationExamFamilyOverviewsQuery)
  const { formatMessage } = useLocale()

  const educationExamFamilyOverviews = data?.educationExamFamilyOverviews || []
  if (loading) {
    return <LoadingTemplate />
  }
  return (
    <>
      {educationExamFamilyOverviews.map((member, index) => (
        <Box key={index} marginBottom={10}>
          <Text variant="h3" marginBottom={3}>
            {member.name}
            {member.isChild && ' (barn)'}
          </Text>
          <EducationCard
            eyebrow={member.organizationType}
            title={member.organizationName}
            description={member.yearInterval}
            CTA={
              <Link
                to={ServicePortalPath.EducationStudentAssessment.replace(
                  ':nationalId',
                  member.nationalId,
                )}
                className={styles.link}
              >
                <Button
                  variant="text"
                  icon="arrowForward"
                  iconType="outline"
                  nowrap
                >
                  {formatMessage(m.viewDetail)}
                </Button>
              </Link>
            }
          />
        </Box>
      ))}
      {educationExamFamilyOverviews.length === 0 && (
        <Box marginTop={8}>
          <EmptyState title={m.noDataFound} />
        </Box>
      )}
    </>
  )
}

const LoadingTemplate = () => (
  <>
    <Text variant="h3" marginBottom={3}>
      <SkeletonLoader width={300} />
    </Text>
    <SkeletonLoader height={158} />
  </>
)

export default CareerCards
