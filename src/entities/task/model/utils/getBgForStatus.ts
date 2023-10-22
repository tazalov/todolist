import { TaskStatus } from '../types/TasksSchema'

export const getBgForStatus = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.COMPLETED: {
      return 'COMPLETED.main'
    }
    case TaskStatus.IN_PROGRESS: {
      return 'IN_PROGRESS.main'
    }
    case TaskStatus.DRAFT: {
      return 'DRAFT.main'
    }
    default: {
      return 'transparent'
    }
  }
}
