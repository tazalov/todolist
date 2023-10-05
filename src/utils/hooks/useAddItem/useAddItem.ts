import { useState, ChangeEvent, KeyboardEvent } from 'react'

export const useAddItem = (addItem: (title: string) => void) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string>('')

  //! ---------- handler for input value
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError('')
  }

  //! ---------- change error msg
  const handleBlur = () => {
    setError('')
  }

  //! ---------- add item with validate
  const addNewItem = () => {
    const newTitle = title.trim()
    if (!newTitle.length) {
      setError("Value can't be empty")
    } else {
      setTitle('')
      addItem(newTitle)
    }
  }

  const handleKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewItem()
    }
  }

  return { title, error, addNewItem, handleChange, handleBlur, handleKeyDownAddItem }
}
