import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import house from '@/assets/house.jpg'
import parser from '@/utils/parser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import i18n from '@/commons/i18n/i18n';
import { useState } from 'react';
import { keyframes } from '@emotion/react';

const FakePropertyCard = () => {
  const [openTooltip, setOpenTooltip] = useState(true);
  const fakeProperty = { property_id: '99999', location: 'Aquí', price: '9999', title: '¡Esto es un ejemplo!', created_at: new Date(), favorite: true };
  const { property_id, location, price, title, created_at, favorite } = fakeProperty;

  const { t } = i18n;

  const growShrink = keyframes`
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
  `;

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea>
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
              {parser.formatDate(created_at, i18n.language, false)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end', p: 0 }} >
        <Tooltip 
          title={t('favorite.tooltip.helper-click')} 
          arrow placement="right" 
          open={openTooltip} 
          sx={{ animation: `${growShrink} 1s infinite` }}
          >
          <IconButton aria-label={t('favorite.tooltip.helper-click')}>
            <FavoriteIcon color={favorite ? "error" : "disabled"} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default FakePropertyCard;
