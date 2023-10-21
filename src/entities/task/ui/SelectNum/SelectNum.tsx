import React, { FC } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SelectProps } from '@mui/material/Select/Select'
import { tasksPriority } from '../../model/const/tasksPriority'
import { SelectMenuItems } from '../../model/const/editMenuPriorityItems'

interface SelectPT extends SelectProps<number> {
  options: SelectMenuItems[]
  label: string
}

export const SelectNum: FC<SelectPT> = ({ label, options, ...rest }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="edit-menu-status-select">{label}</InputLabel>
      <Select label={label} {...rest}>
        {options.map(el => (
          <MenuItem
            key={el.name}
            value={el.value}
            sx={
              el.bgc !== undefined
                ? {
                    borderColor: `${tasksPriority[el.bgc]}.main`,
                    borderWidth: '0 0 0 10px',
                    borderStyle: 'solid',
                  }
                : undefined
            }
          >
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
