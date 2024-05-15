import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import house from '@/assets/house.jpg'
import parser from '@/utils/parser';
import i18n from '@/commons/i18n/i18n';
import FavoriteIcon from '@mui/icons-material/Favorite';
import propertyService from '@/services/propertyService';
import useProperties from '@/hooks/useProperties';
import { debounce } from 'lodash';
import useNotification from '@/hooks/useNotification';

const PropertyCard = ({ property }) => {
  const { property_id, location, price, title, created_at, favorite } = property;
  const navigate = useNavigate();
  const { changeFavoriteProperty } = useProperties();
  const { notify } = useNotification();
  const { t } = i18n;


  const handleCLickCard = (id) => {
    navigate(`/app/property/${id}`);
  };

  const handleFavorite = debounce(async (id) => {
    const { data } = await propertyService.changeFavoriteProperty(id);
    changeFavoriteProperty(data)
    notify(data.favorite ? t('favorite.added') : t('favorite.removed'), data.favorite ? 'success' : 'warning');
  }, 250);

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={() => handleCLickCard(property_id)}>
        <CardMedia
          component="img"
          height="120"
          image={house}
          alt="Vivienda"
        />
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h5" color="text.secondary">
            {title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Vivienda
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography gutterBottom variant="span" component="span">
              Ref: {property_id} | {parser.FormatPrice(price, i18n.language)}
            </Typography>
            <Typography gutterBottom variant="span" component="span">
              {parser.DateReceived(created_at)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end', p: 0 }} >
        <IconButton aria-label="add to favorites" onClick={() => handleFavorite(property_id)}>
          <FavoriteIcon color={favorite ? "error" : "disabled"} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
