interface PensionFund {
  pensionFundId: string
  name: string
  active: boolean
  created: string
  modified: string
}
export function getGenericPensionFund(
  pensionFund: Partial<PensionFund>,
): PensionFund
