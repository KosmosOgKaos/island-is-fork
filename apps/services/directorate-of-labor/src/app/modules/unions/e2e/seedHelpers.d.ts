interface Union {
  union_id: string
  name: string
  active: boolean
  created: string
  modified: string
}
export function getGenericUnion(
  union: Partial<Union>,
): Union
