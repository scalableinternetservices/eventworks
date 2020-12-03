import * as React from 'react'
import { JoinButtonBase, LeaveButtonBase } from '../../style/joinbutton'
import '../../style/joinbutton.tsx'

interface JoinTableButtonProps {
  isJoin: boolean
  onClick: (e: any) => any
}

export const JoinTableButton = ({ isJoin = true, onClick }: JoinTableButtonProps) => {
  const TableButtonBase = isJoin ? JoinButtonBase : LeaveButtonBase
  return (
    <button onClick={onClick}>
      <TableButtonBase>
        {isJoin ? 'JOIN' : 'LEAVE'}
      </TableButtonBase>
    </button>
  )
}