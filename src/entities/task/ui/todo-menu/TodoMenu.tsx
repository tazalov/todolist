import DeleteIcon from '@mui/icons-material/Delete'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { FC, MouseEvent, useState } from 'react'
import { EditMenu } from '../edit-menu/EditMenu'
import { TaskT } from '../../model/types/TasksSchema'

type TodoMenuPT = {
  task: TaskT
  remove: () => void
}

export const TodoMenu: FC<TodoMenuPT> = ({ task, remove }) => {
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
    <div>
      <IconButton
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleOpenEditMenu} disableRipple color="default">
          <ListItemIcon>
            <ReadMoreIcon fontSize={'small'} />
          </ListItemIcon>
          Show more
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple color="default">
          <ListItemIcon>
            <DeleteIcon fontSize={'small'} />
          </ListItemIcon>
          Remove
        </MenuItem>
      </Menu>
      <EditMenu task={task} open={openEditMenu} onClose={handleCloseEditMenu} />
    </div>
  )
}
