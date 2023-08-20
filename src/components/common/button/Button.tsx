import { FC, ReactNode } from 'react'

type ButtonPT = {
  title: string | ReactNode
  callback: () => void
  disable?: boolean
  styledClass: string
}

export const Button: FC<ButtonPT> = ({ title, callback, disable = false, styledClass }) => (
  <button onClick={callback} disabled={disable} className={styledClass}>
    {title}
  </button>
)
