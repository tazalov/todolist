import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

type EditableSpanPT = {
  title: string
  changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPT> = ({ title, changeTitle }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [error, setError] = useState<string>('')

  //! ---------- (de)activate edit mode for current title
  const activateEditMode = () => {
    setEditMode(true)
    setCurrentTitle(title)
  }
  const deactivateEditMode = () => setEditMode(false)
  //! ---------- (de)activate edit mode for current title

  //! ---------- update current title
  const updateTitle = () => {
    const newTitle = currentTitle.trim()
    if (newTitle.length === 0) {
      setError("Value can't be empty")
    } else if (newTitle !== title) {
      changeTitle(currentTitle)
      deactivateEditMode()
    } else {
      deactivateEditMode()
    }
  }
  const updateTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateTitle()
    }
  }
  const updateTitleBlurHandler = () => {
    if (!error) updateTitle()
  }
  //! ---------- update current title

  //! ---------- handler for input with current title
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.currentTarget.value)
    setError('')
  }
  //! ---------- handler for input with current title

  return editMode ? (
    <>
      <input
        type={'text'}
        value={currentTitle}
        onChange={onChangeTitleHandler}
        onBlur={updateTitleBlurHandler}
        onKeyDown={updateTitleKeyDownHandler}
        autoFocus={true}
        style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
      />
      {error && <div className={'error-msg'}>{error}</div>}
    </>
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  )
}
