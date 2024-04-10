import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Fab,
  IconButton,
  InputBase,
  Modal,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InmuebleForm from '../../inmuebleForm/InmuebleForm';
import InmuebleService from '../../services/inmuebleService.js';
import inputValidatorService from '../../services/inputValidatorService';

const AddButtonModal = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [textValue, setTextValue] = useState('');
  const [error, setError] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [inmuebleData, setInmuebleData] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    setTextValue('');
    setError(false);
    setShowForm(false);
    setShowCheckIcon(false);
  };

  const handleClose = () => {
    setOpen(false);
    setShowForm(false);
    setShowCheckIcon(false);
  };

  const handleTextChange = (event) => {
    const value = event.target.value;
    setTextValue(value);
    setError(false);
    setShowForm(false);
    setShowCheckIcon(false);
  };

  const handleSearch = async () => {
    const idInmueble = inputValidatorService.validateIdealistaURL(textValue);

    if (idInmueble.length > 0) {
      setShowCheckIcon(true);
      try {
        const data = await InmuebleService.prepareInmuebleForm(idInmueble);
        setInmuebleData(data);
        setShowForm(true);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    } else {
      setError(true);
      setShowCheckIcon(false);
      setShowForm(false);
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
    setShowCheckIcon(false);
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
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: 'background.paper',
              p: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleClose} sx={{ ml: 1 }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{ flex: 1 }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {t('addButtonModal.url')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <InputBase
                sx={{ flex: 1 }}
                variant="outlined"
                value={textValue}
                onChange={handleTextChange}
                onKeyPress={handleKeyPress}
                placeholder={t('addButtonModal.url')}
                inputProps={{ 'aria-label': 'Introduce la URL' }}
              />
              {showCheckIcon && (
                <div
                  style={{
                    pointerEvents: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                  aria-label="check"
                >
                  <CheckCircleIcon style={{ color: 'green' }} />
                </div>
              )}
              <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="clear"
                onClick={handleClear}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Box>
            {error && (
              <Typography sx={{ color: 'red', fontSize: '0.8rem' }}>
                {t('addButtonModal.validation.error')}
              </Typography>
            )}
            {/* Formulario edición */}
            <Box display={showForm ? 'block' : 'none'}>
              <InmuebleForm inmuebleData={inmuebleData} />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddButtonModal;
