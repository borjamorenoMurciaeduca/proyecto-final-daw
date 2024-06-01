import { Transition } from '@/components/Transition';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';

const useConfirmationDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState({
    title: '',
    message: '',
  });
  const [onConfirm, setOnConfirm] = useState(null);

  const handleOpenDialog = (msg, callback) => {
    setDialogMsg({
      title: msg.title,
      message: msg.message,
      confirmButtonText: msg.confirmButtonText,
      cancelButtonText: msg.cancelButtonText,
    });
    setDialogOpen(true);
    setOnConfirm(() => callback);
  };

  const handleCloseDialog = (confirmed) => {
    setDialogOpen(false);
    if (confirmed && onConfirm) {
      onConfirm();
    }
  };

  const IdealConfirmDialog = () => (
    <Dialog
      open={dialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleCloseDialog(false)}
      aria-describedby="alert-dialog-confirm-action"
    >
      <DialogTitle>{dialogMsg.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-message">
          {dialogMsg.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseDialog(false)}>
          {dialogMsg.cancelButtonText}
        </Button>
        <Button onClick={() => handleCloseDialog(true)}>
          {dialogMsg.confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return {
    handleOpenDialog,
    IdealConfirmDialog,
  };
};
export default useConfirmationDialog;
