import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useState, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { UpdatedTask } from '../../model/types/TasksSchema'
import { EditMenu } from '../EditMenu/EditMenu'

interface Props {
  task: UpdatedTask
  remove: () => void
  disabled?: boolean
}

export const TaskMenu = memo(({ task, remove, disabled = false }: Props) => {
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const [openEditMenu, setOpenEditMenu] = useState(false)

  const handleOpenEditMenu = () => {
    setAnchorEl(null)
    setOpenEditMenu(true)
  }

  const handleCloseEditMenu = () => {
    setOpenEditMenu(false)
  }

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    setAnchorEl(null)
    remove()
  }

  return (
    <>
      <IconButton disabled={disabled} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu id='long-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleOpenEditMenu} disableRipple color='default'>
          <ListItemIcon>
            <ReadMoreIcon fontSize={'small'} />
          </ListItemIcon>
          {t('Show more')}
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple color='default'>
          <ListItemIcon>
            <DeleteIcon fontSize={'small'} />
          </ListItemIcon>
          {t('Remove')}
        </MenuItem>
      </Menu>
      <EditMenu task={task} open={openEditMenu} onClose={handleCloseEditMenu} />
    </>
  )
})
