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
    url_image,
  } = property;

  const navigate = useNavigate();
  const { changeFavoriteProperty } = useProperties();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = i18n;

  const handleCLickCard = (id) => {
    navigate(`/app/property/${id}`);
  };

  const handleFavorite = debounce(async (id) => {
    const { data } = await propertyService.changeFavoriteProperty(id);
    changeFavoriteProperty(data);
    enqueueSnackbar(
      data.favorite
        ? `${t('favorite.added')} ${id}`
        : `${t('favorite.removed')} ${id}`,
      { variant: data.favorite ? 'success' : 'warning' }
    );
  }, 250);

  return (
    <Card sx={{ height: '100%', maxHeight: '350px' }}>
      <CardActionArea onClick={() => handleCLickCard(property_id)}>
        <CardMedia
          component="img"
          height="120"
          image={url_image || house}
          alt="Vivienda"
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
            {location}
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
        <Tooltip title={'actualizar precio'}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => console.log('precio actualizado')}
            sx={{ ml: 1 }}
          >
            Update
          </Button>
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
