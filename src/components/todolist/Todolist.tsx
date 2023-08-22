import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { FilterT, TaskT } from '../../App'
import { AddItemForm } from '../common/addItemForm/AddItemForm'
import { Button } from '../common/button/Button'
import { EditableSpan } from '../common/editableSpan/EditableSpan'
import { Todo } from '../todo/Todo'

type TodolistPT = {
  id: string
  name: string
  tasks: TaskT[]
  filterValue: FilterT
  addTask: (todolistId: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskIsDone: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeFilter: (todolistId: string, filter: FilterT) => void
  removeTodolist: (todolistId: string) => void
  changeTitle: (todoListId: string, name: string) => void
}

export const Todolist: FC<TodolistPT> = ({
  id,
  name,
  tasks,
  filterValue,
  addTask,
  removeTask,
  changeTaskIsDone,
  changeTaskTitle,
  changeFilter,
  removeTodolist,
  changeTitle,
}) => {
  //! ---------- callback for addItemForm
  const addNewTask = (title: string) => {
    addTask(id, title)
  }

  //! ---------- callback for editableSpan
  const changeCurrentTitle = (title: string) => {
    changeTitle(id, title)
  }

  //! ---------- remove current todolist
  const removeCurrent = () => {
    removeTodolist(id)
  }

  //! ---------- change filter for tasks
  const changeFilterForTasks = (filter: FilterT) => () => changeFilter(id, filter)

  //! ---------- array Todo components
  const tasksList = tasks.map(el => {
    const changeIsDoneCurrentTask = (isDone: boolean) => changeTaskIsDone(id, el.id, isDone)
    const changeTitleCurrentTask = (title: string) => changeTaskTitle(id, el.id, title)
    const removeCurrentTask = () => removeTask(id, el.id)

    return (
      <Todo
        key={el.id}
        title={el.title}
        isDone={el.isDone}
        changeIsDone={changeIsDoneCurrentTask}
        changeTitle={changeTitleCurrentTask}
        remove={removeCurrentTask}
      />
    )
  })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2>
          <EditableSpan title={name} changeTitle={changeCurrentTitle} />
        </h2>
        <Button
          title={<FontAwesomeIcon icon={faXmark} />}
          callback={removeCurrent}
          styledClass={''}
        />
      </div>
      <AddItemForm addItem={addNewTask} />
      <ul>{tasksList}</ul>
      <div>
        <Button
          title={'All'}
          callback={changeFilterForTasks('all')}
          styledClass={filterValue === 'all' ? 'active-btn' : ''}
        />
        <Button
          title={'Active'}
          callback={changeFilterForTasks('active')}
          styledClass={filterValue === 'active' ? 'active-btn' : ''}
        />
        <Button
          title={'Completed'}
          callback={changeFilterForTasks('completed')}
          styledClass={filterValue === 'completed' ? 'active-btn' : ''}
        />
      </div>
    </div>
  )
}
