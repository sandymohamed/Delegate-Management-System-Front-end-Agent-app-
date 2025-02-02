import { TableRow } from '@mui/material'
import React from 'react'

const TableHeadRow = ({ children }) => {
    return (
        <TableRow sx={{ backgroundColor: (theme) => `${theme.palette.secondary.main} !important`, }}>
            {children}
        </TableRow>
    )
}

export default TableHeadRow