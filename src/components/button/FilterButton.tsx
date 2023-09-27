import { Button, ButtonProps } from '@mui/material'
import { FC, memo, ReactNode } from 'react'

interface FilterButtonPT extends ButtonProps {
  activeBg: string
  children: ReactNode
}

export const FilterButton: FC<FilterButtonPT> = memo(({ children, activeBg, ...rest }) => {
  return (
    <Button sx={{ bgcolor: activeBg, color: 'secondary.contrastText' }} {...rest}>
      {children}
    </Button>
  )
})
