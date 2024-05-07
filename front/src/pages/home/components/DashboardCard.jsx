import FormateadorPrecio from '@/components/FormateadorPrecio';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ property }) => {
  const { property_id, location, price, title } = property;
  const navigate = useNavigate();

  const handleCLickCard = (id) => {
    console.log('Click en la card', id);
    navigate(`/app/property/${id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={() => handleCLickCard(property_id)}>
        <CardMedia
          component="img"
          height="140"
          image="https://img3.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/83/4a/70/1208340357.jpg"
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

export default DashboardCard;
