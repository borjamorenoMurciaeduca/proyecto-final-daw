import { useNotification } from '@/hooks/useNotification.js';
import InmuebleService from '@/services/inmuebleService.js';
import inputValidatorInmueble from '@/utils/inputValidatorInmueble.js';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Dialog,
  Fab,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InmuebleForm from './InmuebleForm.jsx';

const AddButtonModal = () => {
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [inmuebleData, setInmuebleData] = useState(null);
  const { notify } = useNotification();
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = () => {
    setOpen(true);
    setTextValue('');
    setError(false);
    setShowForm(false);
  };

  const handleClose = () => {
    setOpen(false);
    setShowForm(false);
  };

  const handleTextChange = (event) => {
    const value = event.target.value;
    setTextValue(value);
    setError(false);
    setShowForm(false);
  };

  const handleSearch = async () => {
    const idInmueble = inputValidatorInmueble.validateIdealistaURL(textValue);
    if (idInmueble.length > 0) {
      notify(t('snackbar.url-validation.ok'), 'success');
      try {
        const data = await InmuebleService.prepareInmuebleForm(idInmueble);

        if (data?.dataStatus == 'ok') {
          setInmuebleData(data);
          setShowForm(true);
        } else {
          setShowForm(false);
          if (data?.dataStatus == 'baja') {
            notify(t('snackbar.url-validation.baja'), 'info');
          } else {
            notify(t('snackbar.url-validation.ko'), 'error');
          }
        }
      } catch (error) {
        notify(t('snackbar.prepare-inmueble-form.error'), 'error');
        console.error('Error al obtener datos:', error);
      }
    } else {
      setError(true);
      setShowForm(false);
      notify(t('snackbar.url-validation.ko-format'), 'error');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setShowForm(false);
    setError(false);
    setTextValue('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '10px',
        p: 0,
      }}
    >
      <Fab
        sx={{
          bgcolor: 'navOr.main',
          position: 'fixed',
          // top: 90,
          top: { xs: 'auto', md: 90 },
          bottom: { xs: 20, md: 'auto' },
          // right: 50,
          right: { xs: 20, md: 20, lg: 50 },
        }}
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullScreen={fullScreen}
        maxWidth="md"
      >
        <Grid
          container
          p={5}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Grid item xs={8}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t('addButtonModal.title')}
            </Typography>
          </Grid>
          <Tooltip title={t('tooltip.close')}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Grid item xs={10}>
            <TextField
              fullWidth
              variant="standard"
              label={t('addButtonModal.url')}
              placeholder="https://www.idealista.com/inmueble/xxxxx/"
              value={textValue}
              onChange={handleTextChange}
              onKeyDown={handleKeyPress}
              inputProps={{ 'aria-label': t('addButtonModal.url') }}
            />
          </Grid>
          <Box>
            <Tooltip title={t('tooltip.search')}>
              <IconButton
                type="button"
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('tooltip.clear')}>
              <IconButton
                type="button"
                aria-label="clear"
                onClick={handleClear}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
          {error && (
            <Typography sx={{ color: 'red', fontSize: '0.8rem' }}>
              {t('addButtonModal.validation.error')}
            </Typography>
          )}
          {showForm && (
            <InmuebleForm
              inmuebleData={inmuebleData}
              handleCloseDialog={handleClose}
            />
          )}
        </Grid>
      </Dialog>
    </Box>
  );
};

export default AddButtonModal;
