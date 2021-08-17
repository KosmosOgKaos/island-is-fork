import React, { FC } from 'react'

import {
  Box,
  Text,
  ContentBlock,
  AlertMessage,
} from '@island.is/island-ui/core'
import { FieldBaseProps, formatText } from '@island.is/application/core'
import { m } from '../lib/messages'
import { NationalRegistryGetPerson} from '../types/schema'

interface ExpectedBenefitsData {
  nrOfChildren: number
  monthlyIncome: number
  employmentRatio: number
  employmentStatus: boolean
}

interface employmentData {
  endDate: string
  employmentRatio: string
  employmentStatus: string
}

const getBenefit = ({nrOfChildren, monthlyIncome, employmentRatio, employmentStatus} : ExpectedBenefitsData) => {

  const maxBenefit = 472835
  const childBenefit = 370430
  var benefit = 0
  if (employmentStatus) {
    benefit += 0.7 * monthlyIncome
    if (employmentRatio < 1) {
      benefit *= employmentRatio
    }
    if (benefit > maxBenefit) {
      benefit = maxBenefit
    }
    benefit += (0.04 * childBenefit) * nrOfChildren
  } else {
    benefit += 0.06 * childBenefit * nrOfChildren + childBenefit
  }
  return Math.floor(benefit).toLocaleString('is-IS', {
    style: 'currency',
    currency: 'ISK',
  })
}

interface StatusData {
  endDate: string
}
const getStatus = ({endDate}: StatusData ) => {
  const today = new Date()
  const end = new Date(endDate)
  const month = end.getMonth()
  return new Date(end.setMonth(month - 2)) < today && new Date(end.setMonth(month + 4)) > today
}


const ExpectedBenefits: FC<FieldBaseProps> = ({ application }) => {
  const {person, employment, pensionPayments, insurancePayments, monthlyIncome} = application.answers
  const {nationalRegistry} = application.externalData
  const nrChild = (nationalRegistry
    .data as NationalRegistryGetPerson).childrenNationalId.length
  const {endDate, employmentRatio} = ((employment as unknown) as employmentData)

  var income = Number(pensionPayments?? 0) + Number(insurancePayments ?? 0) + Number(monthlyIncome ?? 0)
  const ratio = Number(employmentRatio) / 100
  const employmentStatus = getStatus({endDate: endDate})
  const benefit = getBenefit({
    nrOfChildren: nrChild,
    monthlyIncome: income,
    employmentRatio: ratio,
    employmentStatus: employmentStatus
  })
  return (
    <Box marginBottom={4}>
      <Text>Áætlaðar atvinnuleysisbætur miðað við gefnar upplýsingar eru:</Text>
      <Text variant="h3">{benefit}</Text>
      <Text> athuga að þetta er aðeins gróf áætlun</Text>
    </Box>
  )
}

export default ExpectedBenefits 
