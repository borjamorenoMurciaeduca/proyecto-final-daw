import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import house from '@/assets/house.jpg'
import parser from '@/utils/parser';
import i18n from '@/commons/i18n/i18n';

const PropertyCard = ({ property }) => {
  const { property_id, location, price, title } = property;
  const navigate = useNavigate();

  const handleCLickCard = (id) => {
    navigate(`/app/property/${id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={() => handleCLickCard(property_id)}>
        <CardMedia
          component="img"
          height="140"
          image={house}
          alt="Vivienda"
        />
        <CardContent>
          <Typography variant="h5" color="text.secondary">
            {title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Vivienda
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
          <Typography gutterBottom variant="span" component="span">
            Ref: {property_id} | {parser.FormatPrice(price, i18n.language)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PropertyCard;
