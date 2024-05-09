import PageLoader from '@/components/PageLoader';
import useViviendas from '@/hooks/useViviendas';
import parser from '@/utils/parser';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
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
    <Grid item xs={12} md={8} justifyContent="center" alignSelf="center" pb={5}>
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
          <Divider>Detalles</Divider>
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              useFlexGap
              sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              <Chip
                color={property.storage_room ? 'success' : 'error'}
                label={
                  property.storage_room ? 'storage room✔️' : 'storage room❌'
                }
                size="small"
              />
              <Chip
                color={property.garage ? 'default' : 'error'}
                label={property.garage ? 'garage✔️' : 'garage❌'}
                size="small"
              />
              <Chip
                color="default"
                label={`price ${parser.FixPrice(property.price)}€`}
                size="small"
              />
              <Chip
                color="default"
                label={`Size ${property.size}m²`}
                size="small"
              />
              <Chip
                color="default"
                label={`Rooms ${property.rooms}`}
                size="small"
              />
            </Stack>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <IconButton
            color="primary"
            aria-label="Facebook"
            onClick={() => window.open('https://www.facebook.com/yourpage')}
          >
            <Facebook />
          </IconButton>

          <IconButton
            color="primary"
            aria-label="Twitter"
            onClick={() =>
              window.open(`https://twitter.com/intent/tweet?url=asdsadad`)
            }
          >
            <Twitter />
          </IconButton>

          <IconButton
            color="primary"
            aria-label="Instagram"
            onClick={() =>
              window.open('https://www.instagram.com/yourusername')
            }
          >
            <Instagram />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PropertyDetails;
