import { TableCell } from '@mui/material'
import React from 'react'

const TableHeadCell = ({ children }) => {
  return (
    <TableCell sx={{
      fontWeight: 'bold',
      backgroundColor: (theme) => `${theme.palette.secondary.main} `,
      color: (theme) => `${theme.palette.text.lighter} `,}}>
      {children}
    </TableCell>
  )
}

export default TableHeadCell