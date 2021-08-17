import * as z from 'zod'
import * as kennitala from 'kennitala'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { m } from './messages'
import { xor } from 'lodash'

export const DataSchema = z.object({
  approveExternalData: z.boolean().refine((v) => v),
  person: z.object({
    name: z.string().nonempty().max(256),
    nationalId: z.string().refine((n) => n && kennitala.isValid(n), {
      params: m.dataSchemeNationalId,
    }),
    phoneNumber: z.string().refine(
      (p) => {
        const phoneNumber = parsePhoneNumberFromString(p, 'IS')
        return phoneNumber && phoneNumber.isValid()
      },
      { params: m.dataSchemePhoneNumber },
    ),
    email: z.string().email(),
    address: z.string().nonempty().max(256),
    partnerNationalId: z.string().refine((n) => n && kennitala.isValid(n), {
      params: m.dataSchemeNationalId,
    }),
    childrenNationalId: z.string().refine((n) => n && kennitala.isValid(n), {
      params: m.dataSchemeNationalId,
    }),
  }),
  secretWord: z.string().optional(),
  getPaperCopy: z.enum(['yes', 'no']),
  payments: z.object({
    bank: z.string().refine((b) => {
      const bankAccount = b.toString()

      return bankAccount.length === 12 // 4 (bank) + 2 (ledger) + 6 (number)
    }),
    pensionFund: z.string().optional(),
    union: z.string().optional(),
    privatePensionFund: z.string().optional(),
    pensionFundPercentage: z.string().optional(),
    privatePensionFundPercentage: z.string().optional(),
    unionPercentage: z.string().optional(),
  }),
  personalTaxCreditRatio: z
    .string()
    .refine((x) => parseFloat(x) >= 0 && parseFloat(x) <= 100)
    .optional(),
  personalTaxCreditMonthlyAmount: z.string().refine((x) => parseFloat(x)),
  monthlyIncome: z.string().refine((x) => parseFloat(x)).optional(),
  insurancePayments: z.string().refine((x) => parseFloat(x)).optional(),
  pensionPayments: z.string().refine((x) => parseFloat(x)).optional(),
  incomeStepOne: z
    .string()
    .refine((x) => parseFloat(x) >= 0 && parseFloat(x) <= 100)
    .optional(),
  incomeStepTwo: z
    .string()
    .refine((x) => parseFloat(x) >= 0 && parseFloat(x) <= 100)
    .optional(),
  onParentalLeave: z.enum(['yes', 'no']),
  employment: z.object ({
    employmentStatus: z.string().optional(),
    employmentRatio: z
      .string()
      .refine((x) => parseFloat(x) >= 0 && parseFloat(x) <= 100)
      .optional(),
    employerEmail: z.string().email(),
    employerName: z.string(),
    startDate: z.string(),
    endDate: z.string()
  })
})
