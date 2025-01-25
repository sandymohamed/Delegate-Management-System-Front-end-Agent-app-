import { Stack, Typography } from '@mui/material'
import React from 'react'
import AccountPopover from './AccountPopover';

const Header = () => {
    return (
        <Stack spacing={2} direction="row" alignContent="center" justifyContent="space-between" sx={{ backgroundColor: 'secondary.main', p: 2 }}>
            <Typography>Logo goes here!</Typography>
            <Typography>Van name!</Typography>

            <AccountPopover />


        </Stack>
    )
}

export default Header;