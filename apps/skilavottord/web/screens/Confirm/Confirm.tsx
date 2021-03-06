import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useWindowSize } from 'react-use'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useI18n } from '@island.is/skilavottord-web/i18n'
import { Box, Stack, Button, Checkbox, Text } from '@island.is/island-ui/core'
import {
  ProcessPageLayout,
  CarDetailsBox,
} from '@island.is/skilavottord-web/components'
import { theme } from '@island.is/island-ui/theme'
import { AUTH_URL } from '@island.is/skilavottord-web/auth/utils'
import { formatDate, formatYear } from '@island.is/skilavottord-web/utils'
import { Car, WithApolloProps } from '@island.is/skilavottord-web/types'
import { UserContext } from '@island.is/skilavottord-web/context'
import { ACCEPTED_TERMS_AND_CONDITION } from '@island.is/skilavottord-web/utils/consts'
import { BASE_PATH } from '@island.is/skilavottord/consts'
import { dateFormat } from '@island.is/shared/constants'

const skilavottordVehicleOwnerMutation = gql`
  mutation skilavottordVehicleOwnerMutation(
    $name: String!
    $nationalId: String!
  ) {
    createSkilavottordVehicleOwner(name: $name, nationalId: $nationalId)
  }
`

const skilavottordVehicleMutation = gql`
  mutation skilavottordVehicleMutation(
    $vinNumber: String!
    $newRegDate: DateTime!
    $color: String!
    $type: String!
    $nationalId: String!
    $permno: String!
  ) {
    createSkilavottordVehicle(
      vinNumber: $vinNumber
      newRegDate: $newRegDate
      color: $color
      type: $type
      nationalId: $nationalId
      permno: $permno
    )
  }
`

export interface VehicleMutation {
  createSkilavottordVehicle: VehicleMutationData
}

export interface VehicleOwnerMutation {
  createSkilavottordVehicleOwner: VehicleOwnerMutationData
}

export interface VehicleOwnerMutationData {
  name: string
  nationalId: string
}

export interface VehicleMutationData {
  car: Car
  newRegDate: string
  nationalId: string
}

const Confirm = ({ apolloState }: WithApolloProps) => {
  const { user } = useContext(UserContext)
  const [checkbox, setCheckbox] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const { width } = useWindowSize()

  const {
    t: { confirm: t, routes },
  } = useI18n()

  const router = useRouter()
  const { id } = router.query

  const car = apolloState[`VehicleInformation:${id}`]

  useEffect(() => {
    if (!car) {
      router.push({
        pathname: `${routes.myCars}`,
      })
    }
  }, [car, router, routes])

  useEffect(() => {
    if (width < theme.breakpoints.lg) {
      return setIsTablet(true)
    }
    setIsTablet(false)
  }, [width])

  const [setVehicle] = useMutation<VehicleMutationData>(
    skilavottordVehicleMutation,
    {
      onCompleted() {
        routeToAuthCheck()
      },
      onError() {
        // Because we want to show error after checking authenication
        routeToAuthCheck()
      },
    },
  )

  const [setVehicleOwner] = useMutation<VehicleOwnerMutation>(
    skilavottordVehicleOwnerMutation,
    {
      onCompleted() {
        setVehicle({
          variables: {
            ...car,
            newRegDate: formatDate(car.firstRegDate, dateFormat.is),
            nationalId: user?.nationalId,
          },
        })
      },
      onError() {
        // Because we want to show error after checking authenication
        routeToAuthCheck()
      },
    },
  )

  const onCancel = () => {
    router.replace({
      pathname: routes.myCars,
    })
  }

  const onConfirm = () => {
    setVehicleOwner({
      variables: {
        name: user?.name,
        nationalId: user?.nationalId,
      },
    })
  }

  const routeToAuthCheck = () => {
    localStorage.setItem(ACCEPTED_TERMS_AND_CONDITION, id.toString())
    router.replace(
      `${AUTH_URL['citizen']}/login?returnUrl=${BASE_PATH}${routes.recycleVehicle.baseRoute}/${id}/handover`,
    )
  }

  const checkboxLabel = (
    <>
      <Text fontWeight={!checkbox ? 'light' : 'medium'}>
        {t.checkbox.label}{' '}
        <a href="https://island.is/skilmalar-island-is">
          {t.checkbox.linkLabel}
        </a>
      </Text>
    </>
  )

  return (
    <>
      {car && (
        <ProcessPageLayout
          processType={'citizen'}
          activeSection={0}
          activeCar={id.toString()}
        >
          <Stack space={4}>
            <Text variant="h1">{t.title}</Text>
            <Stack space={2}>
              <Text variant="h3">{t.subTitles.confirm}</Text>
              <Text>{t.info}</Text>
            </Stack>
            <Stack space={2}>
              <CarDetailsBox
                vehicleId={car.permno}
                vehicleType={car.type}
                modelYear={formatYear(car.firstRegDate, dateFormat.is)}
              />
              <Box padding={4} background="blue100" borderRadius="large">
                <Checkbox
                  name="confirm"
                  label={checkboxLabel.props.children}
                  onChange={({ target }) => {
                    setCheckbox(target.checked)
                  }}
                  checked={checkbox}
                  disabled={!car.isRecyclable}
                />
              </Box>
            </Stack>
            <Box
              width="full"
              display="inlineFlex"
              justifyContent="spaceBetween"
            >
              {isTablet ? (
                <Button
                  variant="ghost"
                  onClick={onCancel}
                  circle
                  size="large"
                  icon="arrowBack"
                />
              ) : (
                <Button variant="ghost" onClick={onCancel}>
                  {t.buttons.cancel}
                </Button>
              )}
              <Button
                disabled={!checkbox}
                icon="arrowForward"
                onClick={() => onConfirm()}
              >
                {t.buttons.continue}
              </Button>
            </Box>
          </Stack>
        </ProcessPageLayout>
      )}
    </>
  )
}

export default Confirm
