import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { FC, MouseEvent, useState } from 'react'
import { EditMenu } from '../edit-menu'

type TodoMenuPT = {
  edit?: () => {}
  remove: () => void
  priority?: () => {}
}

export const TodoMenu: FC<TodoMenuPT> = ({ edit, remove, priority }) => {
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
            <EditIcon fontSize={'small'} />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple color="default">
          <ListItemIcon>
            <DeleteIcon fontSize={'small'} />
          </ListItemIcon>
          Remove
        </MenuItem>
      </Menu>
      <EditMenu open={openEditMenu} onClose={handleCloseEditMenu} />
    </div>
  )
}
