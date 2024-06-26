import house from '@/assets/house.jpg';
import i18n from '@/commons/i18n/i18n';
import useProperties from '@/hooks/useProperties';
import propertyService from '@/services/propertyService';
import parser from '@/utils/parser';
import { useTheme } from '@emotion/react';
import { Twitter } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropertyForm from './PropertyForm';

const PropertyDetailsGlobal = ({
  property,
  setOpen = false,
  enableShare = false,
}) => {
  const [openEditProperty, setOpenEditProperty] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();
  const { updateProperty } = useProperties();

  const handleTwitter = () => {
    const fullURL = parser.getFullURL(property.share_url);
    const data = `${t('property-share.twitter.discover')} ${
      property.location
    } ${t('property-share.twitter.for-only')} ${parser.FormatPrice(
      property.price,
      i18n.language
    )} -  ${fullURL}`;
    window.open(`https://twitter.com/intent/tweet?url=${data}`);
  };

  const handleOpenEditProperty = () => setOpenEditProperty(true);

  const handleCloseEditProperty = () => setOpenEditProperty(false);

  const handleEditSubmit = async (property) => {
    try {
      const res = await propertyService.updateProperty(property);
      if (res.status === 200) {
        updateProperty(property);
        enqueueSnackbar(t('property-info.edit.success'), {
          variant: 'success',
        });
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message || t('property-info.edit.success');
      enqueueSnackbar(msg, { variant: 'error' });
      console.error(t('property-info.edit.error'), error);
    }
  };

  const handleCloseEditDialog = (_, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    setOpenEditProperty(false);
  };

  return (
    <Grid item xs={12} md={8} justifyContent="center" alignSelf="center" pb={5}>
      <Card>
        <CardMedia
          component="img"
          height="340"
          image={property.url_image ? property.url_image : house}
          alt="Inmueble img"
        />
        <CardContent>
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="h5" component="div">
              {property.type_property && (
                <>
                  {t(`property-info.details.${property.type_property}`)}{' '}
                  {t('property-info.details.in')} {property.location}
                </>
              )}
              {!property.type_property && property.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {property.description}
            </Typography>
          </Box>
          <Divider />
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
                label={`${t(
                  'property-info.details.size'
                )} ${parser.FormatNumber(property.size, i18n.language)} m²`}
                size="small"
              />
              <Chip
                color="default"
                label={`${t('property-info.details.rooms')} ${property.rooms}`}
                size="small"
              />
              <Chip
                color="default"
                label={`${t('property-info.details.bath_rooms')} ${
                  property.bath_rooms
                }`}
                size="small"
              />
            </Stack>
          </Box>
        </CardContent>
        {enableShare && (
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button
                size="small"
                color="primary"
                onClick={() => setOpen(true)}
              >
                {t('property-info.details.share')}
              </Button>
              <Tooltip
                title={
                  property.share_url
                    ? t('tooltip.twitter')
                    : t('tooltip.no-twitter')
                }
                placement="bottom"
              >
                <span>
                  <IconButton
                    disabled={!property.share_url}
                    color="primary"
                    aria-label="Twitter"
                    onClick={handleTwitter}
                  >
                    <Twitter />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
            <Button
              size="small"
              variant="text"
              color="warning"
              onClick={() => handleOpenEditProperty(property.property_id)}
            >
              {t('property-info.edit.button-edit')}
            </Button>
          </CardActions>
        )}
      </Card>
      <Dialog
        open={openEditProperty}
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
        fullScreen={lessThanSm}
      >
        <Grid container spacing={2} p={3}>
          <Grid item xs={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t('property-info.edit.edit-property')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PropertyForm
              property={property}
              handleCloseDialog={handleCloseEditProperty}
              edit
              handleSubmit={handleEditSubmit}
            />
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
};

export default PropertyDetailsGlobal;
