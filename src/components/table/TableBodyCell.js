import { TableCell } from '@mui/material'
import React from 'react'

const TableBodyCell = ({ children }) => {
  return (
    <TableCell sx={{ whiteSpace: 'nowrap' }}>
      {children}
    </TableCell>
  )
}

export default TableBodyCell