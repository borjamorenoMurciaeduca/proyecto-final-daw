import house from '@/assets/house.jpg';
import i18n from '@/commons/i18n/i18n';
import useProperties from '@/hooks/useProperties';
import propertyService from '@/services/propertyService';
import parser from '@/utils/parser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { debounce } from 'lodash';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const {
    property_id,
    location,
    price,
    title,
    created_at,
    favorite,
    description,
    type_property,
    url_image,
    cancellation_date,
  } = property;

  const navigate = useNavigate();
  const { changeFavoriteProperty, updatePriceProperty } = useProperties();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = i18n;

  const handleCLickCard = (id) => {
    navigate(`/app/property/${id}`);
  };

  const handleFavorite = debounce(async (id) => {
    try {
      const { data } = await propertyService.changeFavoriteProperty(id);
      changeFavoriteProperty(data);
      enqueueSnackbar(
        data.favorite
          ? `${t('favorite.added')} ${id}`
          : `${t('favorite.removed')} ${id}`,
        { variant: data.favorite ? 'success' : 'warning' }
      );
    } catch (e) {
      console.warn(e);
      enqueueSnackbar(`${t('favorite.error')} ${id}`, { variant: 'error' });
    }
  }, 250);

  const handleUpdatePrice = debounce(async (property_id) => {
    try {
      const { data } = await propertyService.updatePriceProperty(property_id);
      updatePriceProperty(data);
      enqueueSnackbar(
        `${t('property-info.details.price-updated.success')} | ${property_id}`,
        {
          variant: 'success',
        }
      );
    } catch (e) {
      console.warn(e);
      enqueueSnackbar(
        `${t('property-info.details.price-updated.error')} | ${property_id}`,
        {
          variant: 'error',
        }
      );
    }
  }, 250);

  return (
    <Card sx={{ height: '100%', maxHeight: '350px' }}>
      <CardActionArea onClick={() => handleCLickCard(property_id)}>
        <CardMedia
          component="img"
          height="120"
          image={url_image || house}
          alt={type_property}
        />
        <CardContent sx={{ pb: 0 }}>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              lineHeight: '1.5',
              maxHeight: '90px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>
          <Box>
            <Typography
              variant="inherit"
              sx={{
                lineHeight: '1.5',
                maxHeight: '90px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
              gutterBottom
            >
              {description}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {type_property && (
              <>
                {t(`property-info.details.${type_property}`)}{' '}
                {t('property-info.details.in')} {location}
              </>
            )}
            {!type_property && location}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography gutterBottom variant="span" component="span">
              Ref: {property_id} | {parser.FormatPrice(price, i18n.language)}
            </Typography>
            <Typography gutterBottom variant="span" component="span">
              {parser.formatDate(created_at, i18n.language, false)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions
        disableSpacing
        sx={{ justifyContent: 'space-between', p: 0 }}
      >
        <Tooltip
          title={
            cancellation_date
              ? t('property-info.details.tooltip.update-price-disabled')
              : t('property-info.details.tooltip.update-price')
          }
        >
          <span>
            <Button
              size="small"
              variant="outlined"
              disabled={cancellation_date ? true : false}
              onClick={() => handleUpdatePrice(property_id)}
              sx={{ ml: 1 }}
            >
              {cancellation_date
                ? t('property-info.details.tooltip.update-price-disabled')
                : t('property-info.details.tooltip.update-price')}
            </Button>
          </span>
        </Tooltip>
        <Tooltip title={t('favorite.aria-label.add')}>
          <IconButton
            aria-label={t('favorite.aria-label.add')}
            onClick={() => handleFavorite(property_id)}
          >
            <FavoriteIcon color={favorite ? 'error' : 'disabled'} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
