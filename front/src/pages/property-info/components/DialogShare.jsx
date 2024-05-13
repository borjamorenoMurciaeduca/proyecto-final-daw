import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogShare = ({
  open,
  setOpen,
  loading,
  setLoading,
  handleShare,
  shareUrl,
  setShareUrl,
}) => {
  if (loading) return <div>Loading...</div>;
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{'Url para compartir'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="url"
          name="url"
          label="Url share"
          fullWidth
          variant="standard"
          value={shareUrl}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Salir</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogShare;
