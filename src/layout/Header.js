import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import AccountPopover from './AccountPopover';
import { useAuth } from '../context/AuthContext';
import { getVanForAgent } from '../services/vans.services';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVan } from '../redux/slices/vanSlice';

const Header = () => {

    const { user } = useAuth();
    const dispatch = useDispatch();

    // const [vanDetails, setVanDetails] = useState(null);

    const { vanDetails } = useSelector(state => state.van);

    // useEffect(() => {
    //     getVanForAgent(user?.id).then(res => {
    //         console.log(res);

    //         if (res && res.length) setVanDetails(res[0]);
    //     })

    // }, [user]);

    useEffect(() => {
        dispatch(fetchVan(user?.id));
    }, [dispatch, user?.id]);

    return (
        <Stack spacing={2} direction="row" alignContent="center" justifyContent="space-between" sx={{ backgroundColor: 'secondary.main', p: 2, color: 'white' }}>
            <Typography>Logo goes here!</Typography>
            <Typography>{vanDetails?.name}</Typography>

            <AccountPopover />
        </Stack>
    )
}

export default Header;