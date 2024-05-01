import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

const DashboardCard = ({ property }) => {
  const { property_id, location, price } = property;

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://img3.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/83/4a/70/1208340357.jpg"
          alt="Vivienda"
        />
        <CardContent>
          <Typography variant="h5" color="text.secondary">
            [title]
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Vivienda
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
          <Typography gutterBottom variant="span" component="span">
            Ref: {property_id} | {price} €
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DashboardCard;
