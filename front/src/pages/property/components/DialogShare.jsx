import { Transition } from '@/components/Transition';
import useProperties from '@/hooks/useProperties';
import propertyService from '@/services/propertyService';
import parser from '@/utils/parser';
import { useTheme } from '@emotion/react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
import { useSnackbar } from 'notistack';
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const DialogShare = ({ open, setOpen, isShared, propertyURL, propertyId }) => {
  const [loading, setLoading] = useState(false);
  const [shareUrlId, setShareUrlId] = useState('');
  const { updateProperty } = useProperties();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const handleCopyToClipboard = useCallback(
    (e, url = shareUrlId) => {
      if (e) e.preventDefault();

      const urlToCopy = parser.getFullURL(url);

      navigator.clipboard
        .writeText(urlToCopy)
        .then(() => {
          enqueueSnackbar(t('property-share.generator.success-copy'), {
            variant: 'info',
          });
        })
        .catch((error) => {
          enqueueSnackbar(t('property-share.generator.fail-copy'), {
            variant: 'error',
          });
          console.warn(error);
        });
    },
    [shareUrlId, enqueueSnackbar, t]
  );

  const handleShare = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await propertyService.shareProperty(propertyId);
      setTimeout(() => {
        setShareUrlId(data.share_url);
        updateProperty({
          property_id: propertyId,
          share_url: data.share_url,
          is_shared: true,
        });
        // FIX: En IOS no se puede copiar al portapapeles sin interacción del usuario
        handleCopyToClipboard(null, data.share_url);
        enqueueSnackbar(t('property-share.generator.success-url'), {
          variant: 'success',
        });
      }, 800);
    } catch (error) {
      console.warn('Error sharing property', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [propertyId, updateProperty, handleCopyToClipboard, enqueueSnackbar, t]);

  useEffect(() => {
    if (open && !isShared) {
      handleShare();
    } else if (isShared && propertyURL) {
      setShareUrlId(propertyURL);
    }
  }, [open, isShared, propertyURL, handleShare]);

  const handleClose = (_, reason) => {
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
      <DialogTitle>
        IdealistaWatch - {t('property-share.generator.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('property-share.generator.description')}
        </DialogContentText>
        {loading ? (
          <>
            <Skeleton height={50} />{' '}
            <LinearProgress
              sx={{
                height: 10,
                borderRadius: 5,
              }}
            />
          </>
        ) : (
          <FormControl margin="dense" variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password" size="small">
              {t('property-share.generator.label')}
            </InputLabel>
            <OutlinedInput
              id="url-generator"
              label={t('property-share.generator.label')}
              type={'text'}
              size={'small'}
              value={parser.getFullURL(shareUrlId)}
              endAdornment={
                <InputAdornment position="end" size="small">
                  <IconButton
                    aria-label="generate-url"
                    edge="end"
                    onClick={handleCopyToClipboard}
                  >
                    <Tooltip
                      title={t('property-share.copy')}
                      arrow
                      placement="top"
                    >
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
        <Button
          onClick={handleShare}
          disabled={loading}
          startIcon={<AutorenewIcon />}
        >
          {t('property-share.generator.regenerate')}
        </Button>
        <Button onClick={() => setOpen(false)} disabled={loading}>
          {t('property-share.generator.exit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogShare;
