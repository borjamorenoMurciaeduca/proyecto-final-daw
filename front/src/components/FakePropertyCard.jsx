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
import house from '@/assets/house.jpg';
import parser from '@/utils/parser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import i18n from '@/commons/i18n/i18n';
import { keyframes } from '@emotion/react';
import { useTranslation } from 'react-i18next';

const FakePropertyCard = ({ disabledCard = false }) => {
  const { t } = useTranslation();
  const fakeProperty = {
    property_id: '99999',
    location: t('fakePropertyCard.location'),
    price: '9999',
    title: t('fakePropertyCard.title'),
    created_at: new Date(),
    favorite: !disabledCard,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Ornare quam viverra orci sagittis. Et netus et malesuada fames ac. Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Mauris in aliquam sem fringilla ut morbi tincidunt. Vitae ultricies leo integer malesuada nunc vel. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Nunc consequat interdum varius sit amet mattis vulputate enim nulla. Pellentesque adipiscing commodo elit at imperdiet dui. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Odio tempor orci dapibus ultrices in. Diam vulputate ut pharetra sit amet aliquam. At elementum eu facilisis sed odio morbi quis commodo odio. Ultricies leo integer malesuada nunc vel risus commodo viverra maecenas. Vitae aliquet nec ullamcorper sit amet risus nullam. Sed adipiscing diam donec adipiscing tristique. Nec feugiat nisl pretium fusce id velit.',
  };
  const {
    property_id,
    location,
    price,
    title,
    created_at,
    favorite,
    description,
  } = fakeProperty;

  const growShrink = keyframes`
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
  `;

  return (
    <Card
      sx={{
        height: '100%',
        maxHeight: '350px',
        opacity: disabledCard ? 0.5 : 1,
        boxShadow: disabledCard
          ? '0px 2px 4px rgba(0, 0, 0, 0.1)'
          : '0px 2px 10px rgba(0, 0, 0, 0.2)',
        pointerEvents: disabledCard ? 'none' : 'auto',
        '&:hover': {
          boxShadow: disabledCard
            ? '0px 2px 4px rgba(0, 0, 0, 0.1)'
            : '0px 4px 20px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="120" image={house} alt="Vivienda" />
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h5" color="text.secondary">
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
            >
              {description}
            </Typography>
          </Box>
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
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end', p: 0 }}>
        <Tooltip
          title={t('favorite.tooltip.helper-click')}
          arrow
          placement="bottom"
          open={!disabledCard}
          sx={{ animation: !disabledCard ? `${growShrink} 1s infinite` : '' }}
        >
          <IconButton aria-label={t('favorite.tooltip.helper-click')}>
            <FavoriteIcon color={favorite ? 'error' : 'disabled'} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default FakePropertyCard;
