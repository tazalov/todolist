import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'
import { Button, Dialog, DialogTitle, List, ListItem, TextField, SelectChangeEvent } from '@mui/material'
import React, { FC, useState, ChangeEvent, useEffect, useCallback, memo } from 'react'
import { TaskT, TaskStatus, TaskPriority } from '../../model/types/TasksSchema'
import { useAppDispatch } from 'app/providers/store'
import { updateTask } from '../../model/services/updateTask/updateTask'
import { editMenuPriorityItems, editMenuStatusItems } from '../../model/const/editMenuPriorityItems'
import { SelectNum } from '../SelectNum/SelectNum'

export interface EditMenuPT {
  task: TaskT
  open: boolean
  onClose: () => void
}

export const EditMenu: FC<EditMenuPT> = memo(({ task, onClose, open }) => {
  const [editMode, setEditMode] = useState(false)

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [status, setStatus] = useState<TaskStatus>(task.status)
  const [priority, setPriority] = useState<TaskPriority>(task.priority)

  useEffect(() => {
    setTitle(task.title)
  }, [task])

  const dispatch = useAppDispatch()

  const activateEditMode = () => setEditMode(true)

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value)
  }

  const handleChangeStatus = useCallback((e: SelectChangeEvent<number>) => {
    setStatus(+e.target.value)
  }, [])

  const handleChangePriority = useCallback((e: SelectChangeEvent<number>) => {
    setPriority(+e.target.value)
  }, [])

  const handleSaveChanges = () => {
    const model = {
      title,
      description,
      status,
      priority,
    }
    dispatch(updateTask(task.todoListId, task.id, model))
    setEditMode(false)
  }

  const handleCancelChanges = () => {
    setTitle(task.title)
    setDescription(task.description)
    setStatus(task.status)
    setPriority(task.priority)
    setEditMode(false)
  }

  return (
    <Dialog onClose={onClose} open={open} sx={{ minWidth: 300 }}>
      <DialogTitle>Set new data for task</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem sx={{ gap: 1 }}>
          {!editMode && (
            <Button variant="outlined" color={'success'} onClick={activateEditMode} startIcon={<EditIcon />}>
              Edit
            </Button>
          )}
          {editMode && (
            <>
              <Button variant="outlined" color={'info'} onClick={handleSaveChanges} startIcon={<SaveIcon />}>
                Save
              </Button>
              <Button
                variant="outlined"
                color={'error'}
                onClick={handleCancelChanges}
                startIcon={<DisabledByDefaultIcon />}
              >
                Cancel
              </Button>
            </>
          )}
        </ListItem>
        <ListItem>
          <TextField
            label={'New title'}
            variant="outlined"
            size="medium"
            fullWidth
            value={title}
            onChange={handleChangeTitle}
            disabled={!editMode}
          />
        </ListItem>
        <ListItem>
          <TextField
            label={'New description'}
            variant="outlined"
            size="medium"
            multiline
            maxRows={4}
            fullWidth
            value={description}
            onChange={handleChangeDescription}
            disabled={!editMode}
          />
        </ListItem>
        <ListItem>
          <SelectNum
            options={editMenuStatusItems}
            label={'Status'}
            value={status}
            onChange={handleChangeStatus}
            disabled={!editMode}
            fullWidth
          />
        </ListItem>
        <ListItem>
          <SelectNum
            options={editMenuPriorityItems}
            label={'Priority'}
            value={priority}
            onChange={handleChangePriority}
            disabled={!editMode}
            fullWidth
          />
        </ListItem>
      </List>
    </Dialog>
  )
})
