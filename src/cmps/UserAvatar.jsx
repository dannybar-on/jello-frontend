import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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

function stringAvatar(name, url) {
    if (name === 'Guest') return { sx: { bgcolor: stringToColor(name) }, children: `${name.split(' ')[0][0]}` };
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}



export function UserAvatar({ fullname, url }) {
    return (
        <Stack direction="row" spacing={2} >

            {/* <Avatar sx={{ width: 28, height: 28 }}  {...stringAvatar(fullname)} className='user-avatar' /> */}
            <Avatar sx={{ width: 32, height: 32 }}  {...stringAvatar(fullname)} src={url} className='user-avatar' title={fullname} />
        </Stack >
    );
}

