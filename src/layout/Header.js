import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import AccountPopover from './AccountPopover';
import { useAuth } from '../context/AuthContext';
import { getVanForAgent } from '../services/vans.services';

const Header = () => {

    const { user } = useAuth();

    const [vanDetails, setVanDetails] = useState(null);

    useEffect(() => {
        getVanForAgent(user?.id).then(res => {
            if (res && res.length) setVanDetails(res[0]);
        })

    }, [user]);

    return (
        <Stack spacing={2} direction="row" alignContent="center" justifyContent="space-between" sx={{ backgroundColor: 'secondary.main', p: 2, color: 'white' }}>
            <Typography>Logo goes here!</Typography>
            <Typography>{vanDetails?.name}</Typography>

            <AccountPopover />


        </Stack>
    )
}

export default Header;