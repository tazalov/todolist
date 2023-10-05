import { useState, KeyboardEvent, ChangeEvent } from 'react'

export const useEditableSpan = (title: string, changeTitle: (newTitle: string) => void) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  //! ---------- (de)activate edit mode for current title
  const activateEditMode = () => {
    setEditMode(true)
    setCurrentTitle(title)
  }
  const deactivateEditMode = () => setEditMode(false)

  //! ---------- handler for input with current title
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.currentTarget.value)
    setError(false)
  }

  //! ---------- update current title
  const updateTitle = () => {
    const newTitle = currentTitle.trim()
    if (newTitle.length === 0) {
      setError(true)
    } else if (newTitle !== title) {
      changeTitle(currentTitle)
      deactivateEditMode()
    }
  }
  const handleKeyDownUpdateTitle = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateTitle()
    }
  }
  const handleBlurUpdateTitle = () => {
    deactivateEditMode()
    setError(false)
  }

  return {
    editMode,
    currentTitle,
    error,
    activateEditMode,
    handleChange,
    handleKeyDownUpdateTitle,
    handleBlurUpdateTitle,
  }
}
