import * as React from 'react';
import PageLoader from '@/components/PageLoader';
import useProperties from '@/hooks/useProperties';
import { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemButton, Divider, ListItemText, Typography, TextField, Grid } from '@mui/material';

const PropertyNotes = ({ propertyId }) => {
  const [note, setNote] = useState([]);
  const [newNote, setNewNote] = useState({});
  const [editingIndex, setEditingIndex] = useState(-1);
  const { properties } = useProperties();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setEditingIndex(0);
  };

  useEffect(() => {
    const propertieMatch = properties.find(
      (el) => el.property_id == propertyId
    );
    console.log("propertieMatch.notes: ", propertieMatch.notes);
    setNote([...propertieMatch.notes.reverse()]);
  }, [propertyId, properties]);

  if (!note) return <PageLoader />;
  console.log("note: ", note);

  const handleSaveTextarea = () => {
    console.log("new note: ", { newNote });
    console.log("note: ", note);
    setNote([newNote, ...note]);
    setNewNote({});
    setEditingIndex(-1);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemText primary="Añadir comentario" />
      </ListItemButton>
      <ListItem alignItems="flex-start">
        {editingIndex === 0 ? (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9}>
              <TextField
                multiline
                fullWidth
                value={newNote.description}
                onChange={(event) => setNewNote({ create_at: "", description: event.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="primary" onClick={() => handleSaveTextarea()}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        ) : ''}
      </ListItem>
      {Array.isArray(note) && note.map((noteItem, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={noteItem.created_at}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {noteItem.description}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default PropertyNotes;
