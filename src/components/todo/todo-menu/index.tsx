import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { ListItemIcon } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FC, MouseEvent, useState } from 'react'

type TodoMenuPT = {
  edit?: () => {}
  remove: () => void
  priority?: () => {}
}

export const TodoMenu: FC<TodoMenuPT> = ({ edit, remove, priority }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

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
        <MenuItem onClick={handleClose} disableRipple color="default">
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
        <MenuItem onClick={handleClose} disableRipple color="default">
          <ListItemIcon>
            <PriorityHighIcon fontSize={'small'} />
          </ListItemIcon>
          Priority
        </MenuItem>
      </Menu>
    </div>
  )
}
