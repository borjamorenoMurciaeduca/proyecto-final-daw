import PageLoader from '@/components/PageLoader';
import useViviendas from '@/hooks/useViviendas';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useEffect, useState } from 'react';

const PropertyDetails = ({ propertyId }) => {
  const [property, setProperty] = useState();
  const { properties } = useViviendas();

  useEffect(() => {
    const propertieMatch = properties.find(
      (el) => el.property_id == propertyId
    );
    setProperty(propertieMatch);
  }, [propertyId, properties]);

  if (!property) return <PageLoader />;

  return (
    <Grid item xs={12}>
      <Card>
        <CardMedia
          component="img"
          height="340"
          // image={propertie.url_image}
          image="https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/83/4a/70/1208340357.webp"
          alt="Inmueble img"
        />
        <CardContent>
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="h5" component="div">
              {property.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {property.description}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
              <Chip
                color={property.storage_room ? 'primary' : 'default'}
                label="storage_room"
                size="small"
              />
              <Chip label="Medium" size="small" />
              <Chip label="Hard" size="small" />
            </Stack>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PropertyDetails;
