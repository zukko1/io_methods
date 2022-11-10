import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import ErrorIcon from '@mui/icons-material/Error';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ListError({ errorMedio, errorMedioA }) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ErrorOutlineIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={errorMedio} secondary="Error Medio" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ErrorIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={errorMedioA} secondary="Error Medio Absoluto" />
            </ListItem>
        </List>
    );
}