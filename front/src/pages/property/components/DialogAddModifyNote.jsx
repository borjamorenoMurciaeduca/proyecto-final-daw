import { Transition } from '@/components/Transition';
import { useTheme } from '@emotion/react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import noteService from '@/services/noteService.js';

const DialogAddModifyNote = ({
  open,
  setOpen,
  note = {},
  setNote,
  notes,
  setNotes,
  propertyId,
  addNote,
  updateNote,
  title,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const handlePublicCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setNote((prevNote) => ({
      ...prevNote,
      public: isChecked ? 1 : 0,
    }));
  };

  const handleSaveNote = async () => {
    try {
      const theNote = {
        ...note,
        property_id: Number(propertyId),
      };

      const noteId = theNote.id;

      if (theNote.description && theNote.description.trim() !== '') {
        if (!theNote.public) {
          theNote.public = 0;
        }
        let res = null;

        if (noteId) {
          res = await noteService.updateNote({
            noteToUpdate: theNote,
            noteId,
          });
        } else {
          res = await noteService.addNote({
            noteToAdd: theNote,
          });
        }

        if (res.status === 201) {
          if (noteId) {
            updateNote(res.data);
            const updatedNotes = notes.map((n) =>
              n.id === noteId ? res.data : n
            );
            setNotes(updatedNotes);
            enqueueSnackbar(t('property-info.notes.notify.success.update'), {
              variant: 'success',
            });
          } else {
            addNote(res.data);
            setNotes([res.data, ...notes]);
            enqueueSnackbar(t('property-info.notes.notify.success.add'), {
              variant: 'success',
            });
          }
        }
      } else {
        enqueueSnackbar(t('property-info.notes.notify.error.adding-emty'), {
          variant: 'warning',
        });
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        t('property-info.notes.notify.error.note-generic');
      enqueueSnackbar(msg, { variant: 'error' });
      console.error('Error al obtener datos del usuario:', error);
    } finally {
      setOpen(false);
    }
  };

  const handleCancelNote = () => {
    setOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      setOpen(false);
      return;
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="creating-or-editing-note"
      maxWidth="md"
      fullWidth
      fullScreen={lessThanSm}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item xs={12}>
            <TextField
              multiline
              fullWidth
              placeholder={t('property-info.notes.note')}
              rows={4}
              value={note.description}
              onChange={(event) =>
                setNote({
                  ...note,
                  description: event.target.value,
                  public: note.public,
                })
              }
            />
          </Grid>
          <Stack direction="row" justifyContent="flex-end">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    checked={note.public === 1 ? true : false}
                    onChange={handlePublicCheckboxChange}
                  />
                }
                label={t('property-info.notes.isPublic')}
              />
            </FormGroup>
          </Stack>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSaveNote()}
              fullWidth
            >
              {t('property-info.notes.save')}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleCancelNote()}
              fullWidth
            >
              {t('property-info.notes.cancel')}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddModifyNote;