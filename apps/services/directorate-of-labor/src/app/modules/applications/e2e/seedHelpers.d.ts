interface Application {
  application_id: string
  national_id: string
  secret_word: string
  get_paper_copy: boolean
  employment_status: string
  employment_ratio: number
  bank: string
  pension_fund_percentage: number
  personal_tax_credit_ratio: number
  personal_tax_credit_monthly_amount: number
  monthly_income: number
  insurance_payments: number
  pension_payments: number
  income_step_one: number
  income_step_two: number
  on_parental_leave: boolean
  union_id: string
  pension_fund_id: string
  private_pension_fund_id: string
  created: string
  modified: string
}
export function getGenericApplication(
  application: Partial<Application>,
): Application
