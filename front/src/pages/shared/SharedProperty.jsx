import i18n from '@/commons/i18n/i18n';
import PageLoader from '@/components/PageLoader';
import PropertyDetailsGlobal from '@/components/PropertyDetailsGlobal';
import propertyService from '@/services/propertyService';
import parser from '@/utils/parser';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TimelineIcon from '@mui/icons-material/Timeline';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const SharedProperty = () => {
  const [view, setView] = useState(0);
  const [property, setProperty] = useState();
  const [loading, setLoading] = useState(true);
  const { shared_url } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await propertyService.getShareProperty(shared_url);
        setProperty(data);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [shared_url]);

  if (loading && !property) return <PageLoader />;
  if (!loading && !property)
    return (
      <Typography variant="h4">
        No se encontró la propiedad compartida
      </Typography>
    );

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Vivienda compartida por {property.username}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          minHeight: '80vh',
          pb: 7,
        }}
      >
        {view == 0 && <PropertyDetailsGlobal property={property} />}
        {view === 1 && (
          <>
            {property.notes?.length <= 0 && t('property-info.notes.empty')}
            {property.notes?.map((note) => (
              <Grid item xs={8} key={note.id}>
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ mb: 3, textAlign: 'justify' }}
                      component="p"
                    >
                      {note.description}
                    </Typography>
                    <Stack
                      direction="column"
                      spacing={1}
                      flexWrap="wrap"
                      alignItems="flex-end"
                    >
                      <Typography
                        sx={{ textAlign: 'right' }}
                        color="text.secondary"
                      >
                        {parser.formatDate(note?.created_at, i18n.language)}{' '}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ mb: 1.5, textAlign: 'right' }}
                      >
                        {note.updated_at
                          ? `${t('property-info.notes.updated_at')} ${parser.formatDate(
                              note?.updated_at,
                              i18n.language
                            )}`
                          : ''}
                      </Typography>
                      <Typography>
                        {t('property-info.notes.by')} 👤 {note.username}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        )}
      </Grid>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BottomNavigation
          showLabels
          value={view}
          onChange={(_, newValue) => {
            setView(newValue);
          }}
        >
          <BottomNavigationAction
            label={t('property-info.side-panel.details')}
            icon={<TextSnippetIcon />}
          />
          <BottomNavigationAction
            label={t('property-info.side-panel.notes')}
            icon={<TimelineIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Container>
  );
};

export default SharedProperty;
