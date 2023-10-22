export interface SelectMenuItems {
  name: string
  value: number
}

export const editMenuPriorityItems: SelectMenuItems[] = [
  { name: 'Low', value: 0 },
  { name: 'Middle', value: 1 },
  { name: 'High', value: 2 },
  { name: 'Urgently', value: 3 },
  { name: 'Later', value: 4 },
]

export const editMenuStatusItems: SelectMenuItems[] = [
  { name: 'New', value: 0 },
  { name: 'In progress', value: 1 },
  { name: 'Completed', value: 2 },
  { name: 'Draft', value: 3 },
]
