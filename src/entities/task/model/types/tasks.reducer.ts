export interface TaskT {
  id: string
  title: string
  isDone: boolean
}

export interface TasksST {
  [todolistId: string]: TaskT[]
}
