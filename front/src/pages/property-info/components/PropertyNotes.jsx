import * as React from 'react';
import PageLoader from '@/components/PageLoader';
import useProperties from '@/hooks/useProperties';
import { useEffect, useState } from 'react';
import noteService from '@/services/noteService.js';
import { useNotification } from '@/hooks/useNotification';
import { useTranslation } from 'react-i18next';
import { 
  Button, 
  List, 
  ListItem, 
  ListItemButton, 
  Checkbox, 
  ListItemText, 
  Typography, 
  TextField, 
  Grid, 
  Divider,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import parser from '@/utils/parser';
import i18n from '@/commons/i18n/i18n';

const PropertyNotes = ({ propertyId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({});
  const [editNote, setEditNote] = useState({});
  const [creatingIndex, setCreatingIndex] = useState(-1); 
  const [editingIndex, setEditingIndex] = useState(-1); 
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const { properties, addNote, removeNote, updateNote } = useProperties();

  const { notify } = useNotification();


  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setCreatingIndex(0);
  };

  const handlePublicCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setNewNote((prevNote) => ({
    ...prevNote,
    public: isChecked ? 1 : 0
  }));
  };

  const handleEditPublicCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setEditNote((prevNote) => ({
    ...prevNote,
    public: isChecked ? 1 : 0
  }));
  };

  useEffect(() => {
      const propertieMatch = properties.find(
        (el) => el.property_id == propertyId
      );
      setNotes([...propertieMatch.notes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  }, []);

  if (!notes) return <PageLoader />;

  const handleSaveTextarea = async () => {
    try {
      const noteToAdd = {
        ...newNote,
        property_id: Number(propertyId),
      };

      if (noteToAdd.description && noteToAdd.description.trim() !== '') {

        if (!noteToAdd.public) {
          noteToAdd.public = 0;
        }
        const res = await noteService.addNote({ noteToAdd });
              
        if (res.status === 201) {
          addNote(res.data);
          setNotes([res.data, ...notes]);
          setCreatingIndex(-1); 
          setSelectedIndex(-1);
          setNewNote({});
          notify(t('property-info.notes.notify.add-sucess'), 'success');
        }
      } else {
        setNewNote({});
        notify(t('property-info.notes.notify.error.adding-emty'), 'warning');
      }
    } catch (error) {
      setSeverity('error');
      const msg = error?.response?.data?.message || t('property-info.notes.notify.error.note-generic');
      setMessage(msg);
      console.error('Error al obtener datos del usuario:', error);
    } 
  };

  const handleEditSaveTextarea = async (noteId) => {
    try {
      const noteToUpdate = {
        ...editNote,
        property_id: Number(propertyId),
      };

      if (noteToUpdate.description && noteToUpdate.description.trim() !== '') {

        if (!noteToUpdate.public) {
          noteToUpdate.public = 0;
        }

        const res = await noteService.updateNote( {noteToUpdate, noteId });

        if (res.status === 201) {
          updateNote(res.data);
          const updatedNotes = notes.map(note => note.id === noteId ? res.data : note);
          setNotes(updatedNotes);
          setEditingIndex(-1); 
          setEditNote({});
          notify(t('property-info.notes.notify.update-sucess'), 'success');
        }
      } else {
        setEditNote({});
        notify(t('property-info.notes.notify.error.adding-emty'), 'warning');
      }
    } catch (error) {
      setSeverity('error');
      const msg = error?.response?.data?.message || t('property-info.notes.notify.error.note-generic');
      setMessage(msg);
      console.error('Error al obtener datos del usuario:', error);
    } 
  };

  const handleEditNote = async (index) => {
    setEditingIndex(index);
    const editedNote = notes[index];
    setEditNote({
      id: index,
      description: editedNote.description,
      public: editedNote.public,
      updated_at: editedNote.updated_at
    });
  };

  const handleRemoveNote = async (noteId) => {
    try {
      
      const res = await noteService.deleteNote(noteId);

      if (res.status === 200) {
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setNotes(updatedNotes);
        removeNote(noteId);
        notify(t('property-info.notes.notify.delete-sucess'), 'success');
      }
    } catch (error) {
      setSeverity('error');
      const msg = error?.response?.data?.message || t('property-info.notes.notify.error.note-generic');
      setMessage(msg);
      console.error('Error al obtener datos del usuario:', error);
    } 
  };
  
  const handleCancelTextarea = () => {
    setCreatingIndex(-1); 
    setSelectedIndex(-1);
    setNewNote({});
  };

  const handleEditCancelTextarea = () => {
    setEditingIndex(-1); 
    setEditNote({});
  };

  return (
    <Grid item
    xs={12}
    md={8}
    justifyContent="center"
    alignSelf="center"
    pb={5}>
       <List sx={{ bgcolor: 'background.paper' }}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <ListItemButton
            selected={selectedIndex === 0}
            alignItems="flex-start"
            onClick={(event) => handleListItemClick(event, 0)}
            sx={{
              bgcolor: 'primary.main', 
              color: selectedIndex === 0 ? 'black' : 'white', 
              '&:hover': {
                color: 'black',
              }
            }}
          > 
            <ListItemText primary={t('property-info.notes.addNote')}/>
          </ListItemButton>
          </Grid>
        </Grid>    
        <ListItem alignItems="flex-start">
              {creatingIndex === 0 ? ( 
                <Grid container spacing={2} alignItems="center" pb={2}>
                  <Grid item xs={10} md={8}>
                    <TextField
                      multiline
                      fullWidth
                      value={newNote.description}
                      onChange={(event) => setNewNote({description: event.target.value, public: newNote.public})}
                    />
                  </Grid>
                  <Grid item xs={2} md={4}>
                    <Typography variant="body1">{t('property-info.notes.isPublic')}</Typography>
                    <Checkbox
                      checked={newNote.public === 1 ? true : false}
                      onChange={handlePublicCheckboxChange}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button variant="contained" color="primary" onClick={() => handleSaveTextarea()} fullWidth>
                      {t('property-info.notes.save')}
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button variant="outlined" color="primary" onClick={() => handleCancelTextarea()} fullWidth>
                      {t('property-info.notes.cancel')}
                    </Button>
                  </Grid>
                </Grid>
              ) : ''}
            </ListItem>
            {creatingIndex === 0 ? ( 
              <Divider variant="middle" component="li"/>
            ) : ''}
        {notes?.map((noteItem, index) => (
          <Card key={index} id={noteItem.id} sx={{ mb: index < notes.length - 1 ? 2 : 0, mt: 3 }}>
          <CardContent>
            {editingIndex === index ? (
                <Grid container spacing={2} alignItems="center" pb={2}>
                  <Grid item xs={10} md={8}>
                    <TextField
                      multiline
                      fullWidth
                      value={editNote.description}
                      onChange={(event) => setEditNote({description: event.target.value, public: editNote.public})}
                    />
                  </Grid>
                  <Grid item xs={2} md={4}>
                    <Typography variant="body1">{t('property-info.notes.isPublic')}</Typography>
                    <Checkbox
                      checked={editNote.public === 1 ? true : false}
                      onChange={handleEditPublicCheckboxChange}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button variant="contained" color="primary" onClick={() => handleEditSaveTextarea(noteItem.id)} fullWidth>
                      {t('property-info.notes.save')}
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button variant="outlined" color="primary" onClick={() => handleEditCancelTextarea()} fullWidth>
                      {t('property-info.notes.cancel')}
                    </Button>
                  </Grid>
                </Grid>
            ) : (
              <div>
                <Typography sx={{ mb: 3, textAlign: 'justify' }} component="p">
                  {noteItem.description}
                </Typography>
                <Typography sx={{ mb: 1.5, textAlign: 'right' }} color="text.secondary">
                  {parser.formatDate(noteItem?.created_at, i18n.language)} <br/><small>{noteItem.updated_at ? `(${t('property-info.notes.updated_at')} ${parser.formatDate(noteItem?.updated_at, i18n.language)})` : ''}</small>
                </Typography>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Typography variant="body1">{t('property-info.notes.isPublic')}</Typography>
                  <Checkbox
                    checked={noteItem.public === 1 ? true : false}
                    disabled
                  />
                  <Tooltip title={t('property-info.notes.edit-aria-label')}>
                    <IconButton aria-label={t('property-info.notes.edit-aria-label')} onClick={() => handleEditNote(index)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('property-info.notes.remove-aria-label')}>
                    <IconButton aria-label={t('property-info.notes.remove-aria-label')} onClick={() => handleRemoveNote(noteItem.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </div>
            )}
          </CardContent>
        </Card>
        ))}
      </List>
    </Grid>  
  );
};

export default PropertyNotes;
