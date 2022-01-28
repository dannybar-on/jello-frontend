import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import { DynamicModal } from '../cmps/DynamicModal.jsx';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    if (name.indexOf(' ') < 0) return { sx: { bgcolor: stringToColor(name.toUpperCase()) }, children: `${name.split(' ')[0][0]}` };
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
}));

export function LoggedAvatar({ fullname, toggleDynamicModal, isModalOpen }) {
    return (
        <Stack direction="row" spacing={-2}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                variant="dot"
            >
                <Avatar {...stringAvatar(fullname.toUpperCase())} className='loggeduser-avatar' onClick={(event) => { toggleDynamicModal(); position = event.target.getBoundingClientRect(); }} />
                    {isModalOpen && <DynamicModal item={item.title} toggleDynamicModal={toggleDynamicModal} position={position} />}
            </StyledBadge>
        </Stack >
    );
}

var position;
const item = { title: 'Account' };