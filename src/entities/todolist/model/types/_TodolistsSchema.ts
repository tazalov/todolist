export type FilterT = 'all' | 'active' | 'completed'

export interface TodoT {
  id: string
  addedDate: Date
  order: number
  title: string
}

export interface UpdatedTodoT extends TodoT {
  filter: FilterT
  entityStatus: CurrentStatus
}

export interface UpdateModelTodo {
  title?: string
  filter?: FilterT
  entityStatus?: CurrentStatus
}

export type TodoListsSchema = {
  items: UpdatedTodoT[]
  isLoading: boolean
}
