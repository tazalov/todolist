import { Status } from 'entities/notification'

export type FilterT = 'all' | 'active' | 'completed'

export interface TodoListT {
  id: string
  addedDate: Date
  order: number
  title: string
}

export interface UpdatedTodoListT extends TodoListT {
  filter: FilterT
  entityStatus: Status
}

export type TodoListsSchema = UpdatedTodoListT[]
