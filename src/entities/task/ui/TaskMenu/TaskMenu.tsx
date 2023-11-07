import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { FC, MouseEvent, useState, memo } from 'react'

import { UpdatedTaskT } from '../../model/types/TasksSchema'
import { EditMenu } from '../EditMenu/EditMenu'

interface TodoMenuPT {
  task: UpdatedTaskT
  remove: () => void
  disabled?: boolean
}

export const TaskMenu: FC<TodoMenuPT> = memo(({ task, remove, disabled = false }) => {
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
          Show more
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple color='default'>
          <ListItemIcon>
            <DeleteIcon fontSize={'small'} />
          </ListItemIcon>
          Remove
        </MenuItem>
      </Menu>
      <EditMenu task={task} open={openEditMenu} onClose={handleCloseEditMenu} />
    </>
  )
})