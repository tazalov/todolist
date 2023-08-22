import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, FC } from 'react'
import { Button } from '../common/button/Button'
import { EditableSpan } from '../common/editableSpan/EditableSpan'

type TodoPT = {
  title: string
  isDone: boolean
  changeIsDone: (isDone: boolean) => void
  changeTitle: (title: string) => void
  remove: () => void
}

export const Todo: FC<TodoPT> = ({ title, isDone, changeIsDone, changeTitle, remove }) => {
  //! ---------- change isDone current task
  const onChangeDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeIsDone(e.currentTarget.checked)
  }

  //! ---------- change title current task
  const changeCurrentTitle = (newTitle: string) => {
    changeTitle(newTitle)
  }

  return (
    <div className={isDone ? 'is-done' : ''}>
      <input type="checkbox" checked={isDone} onChange={onChangeDoneHandler} />
      <EditableSpan title={title} changeTitle={changeCurrentTitle} />
      <Button title={<FontAwesomeIcon icon={faXmark} />} callback={remove} styledClass={''} />
    </div>
  )
}
