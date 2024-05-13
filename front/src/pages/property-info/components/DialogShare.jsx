import useNotification from '@/hooks/useNotification';
import useProperties from '@/hooks/useProperties';
import propertyService from '@/services/propertyService';
import { Cached } from '@mui/icons-material';
import {
  DialogContentText,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Tooltip,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef, useEffect, useState } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogShare = ({ open, setOpen, propertyId }) => {
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const { updateProperty } = useProperties();
  const { notify } = useNotification();

  useEffect(() => {
    if (open) {
      handleShare();
      console.log('open');
    }
  }, [open]);

  const handleShare = async () => {
    setLoading(true);
    try {
      const { data } = await propertyService.shareProperty(propertyId);
      setTimeout(() => {
        setShareUrl(data.share_url);
        updateProperty({
          property_id: propertyId,
          share_url: data.share_url,
          is_shared: true,
        });
        handleCopyToClipboard(data.share_url);
      }, 500);
    } catch (error) {
      console.warn('Error sharing property', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleCopyToClipboard = (url = shareUrl) => {
    const urlToCopy = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/shared/${url}`;
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        notify('URL copiada al portapapeles', 'success');
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="url-generator"
    >
      <DialogTitle>{'Identificado único url'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Genera una URL única y comparte este inmueble.
        </DialogContentText>
        <FormControl sx={{ my: 1 }} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password" size="small">
            URL-generator
          </InputLabel>
          <OutlinedInput
            id="url-generator"
            label="URL-generator"
            type={'text'}
            size={'small'}
            value={`${window.location.protocol}//${window.location.hostname}:${window.location.port}/shared/${shareUrl}`}
            endAdornment={
              <InputAdornment position="end" size="small">
                <IconButton
                  aria-label="generate-url"
                  edge="end"
                  onClick={handleShare}
                >
                  <Tooltip title="generar url" arrow placement="top">
                    <Cached />
                  </Tooltip>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {loading && <LinearProgress />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCopyToClipboard}>Copiar al portapapeles</Button>
        <Button onClick={() => setOpen(false)}>Salir</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogShare;
