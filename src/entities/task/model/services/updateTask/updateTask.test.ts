import { updateTask } from './updateTask'
import { tasksAPI, TasksAPI } from '../../../api/tasks.api'
import { BaseResponseT } from 'shared/api/types/todolist'
import { TaskT, TaskModel } from '../../types/TasksSchema'
import { StateSchema, AppThunkExtra } from 'app/providers/store'
import { ChangeTask } from '../../actions/tasks.actions'
import { AxiosResponse } from 'axios'
import { getModelSpecificTask } from '../../selectors/tasks'

jest.mock('../../../api/tasks.api')
jest.mock('../../selectors/tasks')

const tasksAPIMock = tasksAPI as jest.Mocked<TasksAPI>
const getModelSpecificTaskMocked = getModelSpecificTask as jest.MockedFunction<typeof getModelSpecificTask>

const task: TaskT = {
  id: '747a7bb8-8905-41a8-aef0-70598b2108a2',
  title: 'new',
  description: 'asd',
  todoListId: '13afa779-0be4-44d4-9e74-817c3e6b503a',
  order: -1,
  status: 1,
  priority: 1,
  startDate: new Date(),
  deadline: new Date(),
  addedDate: new Date(),
}

const taskModel: TaskModel = {
  title: 'new',
  description: 'asd',
  status: 1,
  priority: 1,
  startDate: new Date(),
  deadline: new Date(),
}

describe('updateTask thunk', () => {
  it('set of actions for a successful request is correct', async () => {
    const dispatch = jest.fn()
    const getState = () => ({}) as StateSchema
    const extra = {
      tasksAPI: tasksAPIMock,
    } as unknown as AppThunkExtra

    const result = {
      data: {
        resultCode: 0,
        data: { item: task },
        messages: [],
        fieldsErrors: [],
      },
    }

    getModelSpecificTaskMocked.mockReturnValue(() => task)
    tasksAPIMock.updateTask.mockReturnValue(
      Promise.resolve(result as unknown as AxiosResponse<BaseResponseT<{ item: TaskT }>>),
    )

    await updateTask('1', '2', taskModel)(dispatch, getState, extra)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(ChangeTask('2', task))
  })
})
