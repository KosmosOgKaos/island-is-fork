import {
  ServicePortalModule,
  ServicePortalPath,
} from '@island.is/service-portal/core'
import { lazy } from 'react'

export const educationModule: ServicePortalModule = {
  name: 'Menntun',
  widgets: () => [],
  routes: () => [
    {
      name: 'Menntun',
      path: ServicePortalPath.EducationRoot,
      render: () =>
        lazy(() =>
          import(
            '../../education-career/src/screens/EducationCareer/EducationCareer'
          ),
        ),
    },
  ],
}
