export type FilterT = 'all' | 'active' | 'completed'

export interface TodoListT {
  id: string
  addedDate: Date
  order: number
  title: string
}

export interface UpdatedTodoListT extends TodoListT {
  filter: FilterT
  entityStatus: CurrentStatus
}

export interface UpdateModelTodoList {
  title?: string
  filter?: FilterT
  entityStatus?: CurrentStatus
}

export type TodoListsSchema = UpdatedTodoListT[]
