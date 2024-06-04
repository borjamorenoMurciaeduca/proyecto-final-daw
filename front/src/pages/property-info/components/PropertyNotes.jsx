import i18n from '@/commons/i18n/i18n';
import PageLoader from '@/components/PageLoader';
import useProperties from '@/hooks/useProperties';
import noteService from '@/services/noteService.js';
import parser from '@/utils/parser';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCommentIcon from '@mui/icons-material/AddComment';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DialogAddModifyNote from './DialogAddModifyNote';

const PropertyNotes = ({ propertyId }) => {
  const [notes, setNotes] = useState([]);
  const [dialogNote, setDialogNote] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState('');
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { properties, addNote, removeNote, updateNote } = useProperties();

  const handleAddNoteClick = () => {
    setTitleDialog(t('property-info.notes.dialog-title-add'));
    setDialogNote({
      description: '',
      public: 0,
    });
    setOpenDialog(true);
  };

  useEffect(() => {
    const propertieMatch = properties.find(
      (el) => el.property_id == propertyId
    );
    setNotes(
      [...propertieMatch.notes].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    );
  }, []);

  if (!notes) return <PageLoader />;

  const handleEditNote = async (index) => {
    setTitleDialog(t('property-info.notes.dialog-title-edit'));
    const editedNote = notes[index];
    setDialogNote({
      id: editedNote.id,
      description: editedNote.description,
      public: editedNote.public,
      updated_at: editedNote.updated_at,
    });
    setOpenDialog(true);
  };

  const handleRemoveNote = async (noteId) => {
    try {
      const res = await noteService.deleteNote(noteId);

      if (res.status === 200) {
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setNotes(updatedNotes);
        removeNote(noteId);
        enqueueSnackbar(t('property-info.notes.notify.success.remove'), {
          variant: 'success',
        });
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        t('property-info.notes.notify.error.note-generic');
      enqueueSnackbar(msg, {
        variant: 'error',
      });
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  return (
    <Grid item xs={12} md={8} justifyContent="center" alignSelf="center" pb={5}>
      <DialogAddModifyNote
        open={openDialog}
        setOpen={setOpenDialog}
        note={dialogNote}
        setNote={setDialogNote}
        notes={notes}
        setNotes={setNotes}
        propertyId={propertyId}
        addNote={addNote}
        updateNote={updateNote}
        title={titleDialog}
      />
      <List sx={{ bgcolor: 'background.paper' }}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<AddCommentIcon />}
              onClick={() => handleAddNoteClick()}
              sx={{ width: '100%' }}
            >
              {t('property-info.notes.addNote')}
            </Button>
          </Grid>
        </Grid>
        {notes?.map((noteItem, index) => (
          <Card
            key={noteItem.id}
            id={noteItem.id}
            sx={{ mb: index < notes.length - 1 ? 2 : 0, mt: 3 }}
          >
            <CardContent>
              <div>
                <Typography sx={{ mb: 3, textAlign: 'justify' }} component="p">
                  {noteItem.description}
                </Typography>
                <Typography
                  sx={{ mb: 1.5, textAlign: 'right' }}
                  color="text.secondary"
                >
                  {parser.formatDate(noteItem?.created_at, i18n.language)}{' '}
                  <br />
                  <small>
                    {noteItem.updated_at
                      ? `(${t(
                          'property-info.notes.updated_at'
                        )} ${parser.formatDate(
                          noteItem?.updated_at,
                          i18n.language
                        )})`
                      : ''}
                  </small>
                </Typography>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Tooltip
                    title={
                      noteItem.public === 1
                        ? t('property-info.notes.tooltip.publicNote')
                        : t('property-info.notes.tooltip.privateNote')
                    }
                  >
                    <Chip
                      label={
                        noteItem.public === 1
                          ? t('property-info.notes.publicNote')
                          : t('property-info.notes.privateNote')
                      }
                      color={noteItem.public === 1 ? 'success' : 'primary'}
                    />
                  </Tooltip>
                  <Tooltip title={t('property-info.notes.aria-label.edit')}>
                    <IconButton
                      aria-label={t('property-info.notes.aria-label.edit')}
                      onClick={() => handleEditNote(index)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('property-info.notes.aria-label.remove')}>
                    <IconButton
                      aria-label={t('property-info.notes.aria-label.remove')}
                      onClick={() => handleRemoveNote(noteItem.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </div>
            </CardContent>
          </Card>
        ))}
      </List>
    </Grid>
  );
};

export default PropertyNotes;
