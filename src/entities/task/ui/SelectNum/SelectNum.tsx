import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { SelectProps } from '@mui/material/Select/Select'

import { SelectMenuItems } from '../../model/const/editMenuItems'

interface Props extends SelectProps<number> {
  options: SelectMenuItems[]
  label: string
  colors: {
    [key in string]: string
  }
}

export const SelectNum = ({ label, options, colors, ...rest }: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='edit-menu-status-select'>{label}</InputLabel>
      <Select label={label} {...rest}>
        {options.map((el) => (
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
