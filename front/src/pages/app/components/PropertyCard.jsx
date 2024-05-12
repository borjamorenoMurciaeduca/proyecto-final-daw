import FormateadorPrecio from '@/components/FormateadorPrecio';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import house from '@/assets/house.jpg'
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
            Ref: {property_id} | <FormateadorPrecio precio={price} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PropertyCard;
