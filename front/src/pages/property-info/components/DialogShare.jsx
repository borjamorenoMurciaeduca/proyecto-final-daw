import useNotification from '@/hooks/useNotification';
import useProperties from '@/hooks/useProperties';
import propertyService from '@/services/propertyService';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {
  DialogContentText,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Skeleton,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef, useEffect, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme } from '@emotion/react';
import parser from '@/utils/parser';
import { useTranslation } from 'react-i18next';
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogShare = ({ open, setOpen, isShared, propertyURL, propertyId }) => {
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const { updateProperty } = useProperties();
  const { notify } = useNotification();
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (open && !isShared) {
      handleShare();
    } else if (isShared && propertyURL) {
      setShareUrl(propertyURL)
    }
  }, [open, isShared, propertyURL]);

  const { t } = useTranslation();

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
        handleCopyToClipboard(null, data.share_url);
      }, 800);
    } catch (error) {
      console.warn('Error sharing property', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleCopyToClipboard = (e, url = shareUrl) => {
    if (e) e.preventDefault();
    const urlToCopy = parser.getFullURL(url);
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        notify('URL copiada al portapapeles', 'success');
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick' && loading) {
      return;
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="url-generator"
      maxWidth="xs"
      fullWidth
      fullScreen={lessThanSm}
      onClose={handleClose}
    >
      <DialogTitle>IdealistaWatch - {t('property-share.generator.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('property-share.generator.description')}
        </DialogContentText>
        {loading ? <><Skeleton height={50} />  <LinearProgress sx={{
          height: 10,
          borderRadius: 5
        }} /></> : (
          <FormControl margin='dense' variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password" size="small">
              {t('property-share.generator.label')}
            </InputLabel>
            <OutlinedInput
              id="url-generator"
              label={t('property-share.generator.label')}
              type={'text'}
              size={'small'}
              value={`${window.location.protocol}//${window.location.hostname}:${window.location.port}/shared/${shareUrl}`}
              endAdornment={
                <InputAdornment position="end" size="small">
                  <IconButton
                    aria-label="generate-url"
                    edge="end"
                    onClick={handleCopyToClipboard}
                  >
                    <Tooltip title={t('property-share.copy')} arrow placement="top">
                      <ContentCopyIcon />
                    </Tooltip>
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="url-helper">
              {t('property-share.generator.helper')}
            </FormHelperText>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleShare} disabled={loading} startIcon={<AutorenewIcon />}>{t('property-share.generator.regenerate')}</Button>
        <Button onClick={() => setOpen(false)} disabled={loading}>{t('property-share.generator.exit')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogShare;
