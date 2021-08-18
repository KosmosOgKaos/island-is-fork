interface PensionFund {
  pension_fund_id: string
  name: string
  active: boolean
  created: string
  modified: string
}
export function getGenericPensionFund(
  pensionFund: Partial<PensionFund>,
): PensionFund
