import PageLoader from '@/components/PageLoader';
import PropertyDetailsGlobal from '@/components/PropertyDetailsGlobal';
import useProperties from '@/hooks/useProperties';
import { useEffect, useState } from 'react';
import DialogShare from './DialogShare';
import { useNavigate } from 'react-router-dom';

const PropertyDetails = ({ propertyId }) => {
  const [property, setProperty] = useState();
  const [open, setOpen] = useState(false);
  const { properties } = useProperties();
  const navigate = useNavigate();

  useEffect(() => {
    const propertyMatch = properties.find((el) => el.property_id == propertyId);
    !propertyMatch ? navigate('/404') : setProperty(propertyMatch);
  }, [propertyId, properties, navigate]);

  if (!property) return <PageLoader />;

  return (
    <>
      <PropertyDetailsGlobal
        property={property}
        setOpen={setOpen}
        enableShare
      />
      <DialogShare open={open} setOpen={setOpen} propertyId={propertyId} isShared={property.is_shared} propertyURL={property.share_url} />
    </>
  );
};

export default PropertyDetails;

{
  /* <Grid
        item
        xs={12}
        md={8}
        justifyContent="center"
        alignSelf="center"
        pb={5}
      >
        <Card>
          <CardMedia
            component="img"
            height="340"
            // image={propertie.url_image}
            // image="https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/83/4a/70/1208340357.webp"
            image={house}
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
            <Divider> </Divider>
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
                    property.storage_room
                      ? `${t('property-info.details.storage-room')}✔️`
                      : `${t('property-info.details.storage-room')}❌`
                  }
                  size="small"
                />
                <Chip
                  color={property.garage ? 'success' : 'error'}
                  label={
                    property.garage
                      ? `${t('property-info.details.garage')}✔️`
                      : `${t('property-info.details.garage')}❌`
                  }
                  size="small"
                />
                <Chip
                  color="default"
                  label={`${t(
                    'property-info.details.price'
                  )} ${parser.FormatPrice(property.price, i18n.language)}`}
                  size="small"
                />
                <Chip
                  color="default"
                  label={`${t('property-info.details.size')} ${
                    property.size
                  }m²`}
                  size="small"
                />
                <Chip
                  color="default"
                  label={`${t('property-info.details.rooms')} ${
                    property.rooms
                  }`}
                  size="small"
                />
                <Chip
                color="default"
                label={`${t('property-info.details.bath_rooms')} ${property.bath_rooms}`}
                size="small"
              />
              </Stack>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={() => setOpen(true)}>
              {t('property-info.details.share')}
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
      </Grid> */
}
