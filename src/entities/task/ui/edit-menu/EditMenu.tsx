import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  TextField,
  SelectChangeEvent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'
import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import { TaskT, TaskStatus, TaskPriority } from '../../model/types/TasksSchema'
import { useAppDispatch } from 'app/providers/store'
import { updateTask } from '../../model/services/updateTask/updateTask'
import { tasksPriority } from '../../model/const/styles/tasksPriority'

const editMenuPriorityItems = [
  { name: 'Low', value: 0, bgc: TaskPriority.LOW },
  { name: 'Middle', value: 1, bgc: TaskPriority.MIDDLE },
  { name: 'High', value: 2, bgc: TaskPriority.HIGH },
  { name: 'Urgently', value: 3, bgc: TaskPriority.URGENTLY },
  { name: 'Later', value: 4, bgc: TaskPriority.LATER },
]

export interface EditMenuPT {
  task: TaskT
  open: boolean
  onClose: () => void
}

export const EditMenu: FC<EditMenuPT> = ({ task, onClose, open }) => {
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

  const handleChangeStatus = (e: SelectChangeEvent) => {
    setStatus(+e.target.value)
  }

  const handleChangePriority = (e: SelectChangeEvent) => {
    setPriority(+e.target.value)
  }

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
          <FormControl fullWidth>
            <InputLabel id="edit-menu-status-select">Status</InputLabel>
            <Select
              value={status + ''}
              label="Status"
              onChange={handleChangeStatus}
              disabled={!editMode}
              fullWidth
            >
              <MenuItem value={0}>New</MenuItem>
              <MenuItem value={1}>In progress</MenuItem>
              <MenuItem value={2}>Completed</MenuItem>
              <MenuItem value={3}>Draft</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel id="edit-menu-priority-select">Priority</InputLabel>
            <Select
              value={priority + ''}
              labelId="edit-menu-priority-select"
              label="Priority"
              onChange={handleChangePriority}
              disabled={!editMode}
            >
              {editMenuPriorityItems.map((el, i) => (
                <MenuItem
                  key={i}
                  value={el.value}
                  sx={{
                    borderColor: `${tasksPriority[el.bgc]}.main`,
                    borderWidth: '0 0 0 5px',
                    borderStyle: 'solid',
                  }}
                >
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
      </List>
    </Dialog>
  )
}
