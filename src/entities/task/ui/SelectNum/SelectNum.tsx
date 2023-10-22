import React, { FC } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SelectProps } from '@mui/material/Select/Select'
import { SelectMenuItems } from '../../model/const/editMenuItems'

interface SelectPT extends SelectProps<number> {
  options: SelectMenuItems[]
  label: string
  colors: {
    [key in string]: string
  }
}

export const SelectNum: FC<SelectPT> = ({ label, options, colors, ...rest }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="edit-menu-status-select">{label}</InputLabel>
      <Select label={label} {...rest}>
        {options.map(el => (
          <MenuItem
            key={el.name}
            value={el.value}
            sx={{
              borderColor: `${colors[el.value]}.main`,
              borderWidth: '0 0 0 10px',
              borderStyle: 'solid',
            }}
          >
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
