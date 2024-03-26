import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

const DashboardCard = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://img3.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/83/4a/70/1208340357.jpg"
          alt="Vivienda"
        />
        <CardContent>
          <Typography variant="h5" color="text.secondary">
            Inmobiliaria Rosa & Porta
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Vivienda
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Casa de pueblo en venta en calle Esperanza Castillo, 17
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DashboardCard;
