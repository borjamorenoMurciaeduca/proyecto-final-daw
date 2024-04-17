import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';

export const NotificationService = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');

    const handleClose = () => {
        setOpen(false);
    };

    const notify = (message, severity) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export const notify = (message, severity) => {
    NotificationService.notify(message, severity);
};
