export type FilterT = 'all' | 'active' | 'completed'

export interface TodoListT {
  id: string
  title: string
  filter: FilterT
}

export type TodoListST = TodoListT[]
