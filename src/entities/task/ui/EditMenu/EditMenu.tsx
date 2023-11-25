import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { Button, Dialog, DialogTitle, List, ListItem, TextField, SelectChangeEvent } from '@mui/material'
import { FC, useState, ChangeEvent, useEffect, useCallback, memo } from 'react'

import { useTranslation } from 'react-i18next'

import { tasksStatus, tasksPriority } from '../../model/const/colorsEditMenuItems'
import { editMenuPriorityItems, editMenuStatusItems } from '../../model/const/editMenuItems'
import { taskThunks } from '../../model/services'
import { TaskStatus, TaskPriority, UpdatedTaskT } from '../../model/types/TasksSchema'
import { SelectNum } from '../SelectNum/SelectNum'

import { useAction } from 'shared/lib/hooks'

export interface EditMenuPT {
  task: UpdatedTaskT
  open: boolean
  onClose: () => void
}

// TODO - translation for select items
export const EditMenu: FC<EditMenuPT> = memo(({ task, onClose, open }) => {
  const { t } = useTranslation()

  const [editMode, setEditMode] = useState(false)

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [status, setStatus] = useState<TaskStatus>(task.status)
  const [priority, setPriority] = useState<TaskPriority>(task.priority)

  useEffect(() => {
    setTitle(task.title)
  }, [task])

  const { updateTask } = useAction(taskThunks)

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
    const taskModel = {
      title,
      description,
      status,
      priority,
    }
    updateTask({ todoId: task.todoListId, taskId: task.id, taskModel })
    setEditMode(false)
  }

  const handleCancelChanges = () => {
    setTitle(task.title)
    setDescription(task.description || '')
    setStatus(task.status)
    setPriority(task.priority)
    setEditMode(false)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle align={'center'}>{t('Edit task data')}</DialogTitle>
      <List sx={{ pt: 0, minWidth: 300 }}>
        <ListItem sx={{ gap: 1 }}>
          {!editMode && (
            <Button
              variant='outlined'
              color={'success'}
              onClick={activateEditMode}
              startIcon={<EditIcon />}
              disabled={task.entityStatus === 'loading'}
            >
              {t('Edit')}
            </Button>
          )}
          {editMode && (
            <>
              <Button
                variant='outlined'
                color={'info'}
                onClick={handleSaveChanges}
                startIcon={<SaveIcon />}
                disabled={task.entityStatus === 'loading'}
              >
                {t('Save')}
              </Button>
              <Button
                variant='outlined'
                color={'error'}
                onClick={handleCancelChanges}
                startIcon={<DisabledByDefaultIcon />}
                disabled={task.entityStatus === 'loading'}
              >
                {t('Cancel')}
              </Button>
            </>
          )}
        </ListItem>
        <ListItem>
          <TextField
            label={t('Name')}
            variant='outlined'
            size='medium'
            fullWidth
            value={title}
            onChange={handleChangeTitle}
            disabled={!editMode}
          />
        </ListItem>
        <ListItem>
          <TextField
            label={t('Description')}
            variant='outlined'
            size='medium'
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
            colors={tasksStatus}
            label={t('Status')}
            value={status}
            onChange={handleChangeStatus}
            disabled={!editMode}
            fullWidth
          />
        </ListItem>
        <ListItem>
          <SelectNum
            options={editMenuPriorityItems}
            colors={tasksPriority}
            label={t('Priority')}
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
