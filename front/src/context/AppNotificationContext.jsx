import { Alert, Snackbar } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
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
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};
