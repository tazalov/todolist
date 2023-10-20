import { TaskStatus } from '../types/TasksSchema'

export const getBgForStatus = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.COMPLETED: {
      return 'completed.main'
    }
    case TaskStatus.IN_PROGRESS: {
      return 'inProgress.main'
    }
    case TaskStatus.DRAFT: {
      return 'draft.main'
    }
    default: {
      return 'transparent'
    }
  }
}
