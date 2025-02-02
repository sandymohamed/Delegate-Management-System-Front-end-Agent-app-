import { Box, Typography } from '@mui/material'
import React from 'react'

const FormBlock = ({ children }) => {
    return (
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            {children}

        </Box>
    )
}

export default FormBlock