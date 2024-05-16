import { Button, IconButton } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { closeSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';

export const Notistack = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2500}
      action={(snackbarId) => (
        <IconButton
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => closeSnackbar(snackbarId)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};
