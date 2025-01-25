import React from 'react';
import { Drawer, Link, List, ListItem, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../components/iconify/Iconify';
import { icons } from '../components/iconify/IconRegistry';

const LINKS = [
    {
        title: 'الرئيسية',
        path: '/',
        icon: icons.files
    },
    {
        title: 'المنتجات',
        path: '/products',
        icon: icons.files
    },
    {
        title: 'الموردين',
        path: '/suppliers',
        icon: icons.files
    },
    {
        title: 'المخزون',
        path: '/stock',
        icon: icons.files
    },
    {
        title: 'الموظفين',
        path: '/employees',
        icon: icons.files
    },
]

const Navbar = ({ openNav, handleCloseNav }) => {

    return (
        <Drawer
            open={openNav}
            onClose={handleCloseNav}
            ModalProps={{
                keepMounted: true,
            }}
            PaperProps={{
                sx: {
                    width: '15rem',
                    backgroundColor: 'secondary.main',

                },
            }}
        >
            <Stack spacing={4} alignItems="center" justifyContent="center" py={2} height="100%" >

                <img src="https://i.ibb.co/0jY7b2D/logo.png" alt="logo" width={100} height={100} />
                <Stack spacing={4} alignItems="center" justifyContent="center" height="100%" >
                    <List>
                        {LINKS.map((link) => (<ListItem key={link.title} sx={{ fontSize: '1.2rem', my: 2 }}>
                            <Link component={RouterLink} to={link.path} underline="none" color="white">
                                <Iconify icon={link.icon} />  {link.title}
                            </Link>
                        </ListItem>))}
                    </List>
                </Stack>
            </Stack>
        </Drawer>
    )
}

export default Navbar;