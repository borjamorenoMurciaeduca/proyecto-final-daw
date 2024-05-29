import AddButtonModal from '@/components/AddButtonModal';
import PropertyCard from '@/components/PropertyCard';
import useProperties from '@/hooks/useProperties';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import StepperEmpty from './components/StepperEmpty';
import Carousel from 'react-material-ui-carousel';
import { property } from 'lodash';
import house from '@/assets/house.jpg';
import './style.css';
import { useNavigate } from 'react-router-dom';
import i18n from '@/commons/i18n/i18n';
import parser from '@/utils/parser';

const App = () => {
  const { properties } = useProperties();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const propertiesMax = 6;
  const sortedProperties = properties.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const propertiesPage = sortedProperties.slice(0, propertiesMax);

  const settings = {
    autoPlay: true,
    animation: 'slide',
    indicators: true,
    duration: 500,
    navButtonsAlwaysVisible: false,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: true,
  };

  const handleCLickProperty = (id) => {
    navigate(`/app/property/${id}`);
  };

  return (
    <>
      <AddButtonModal />
      {!properties.length ? (
        <StepperEmpty />
      ) : (
        <>
          <Typography component="h1" variant="h2">
            {t('page.last-properties.title')}
          </Typography>
          <Carousel {...settings}>
            {propertiesPage.map(
              ({
                property_id,
                location,
                price,
                title,
                description,
                url_image,
              }) => (
                <Card raised className="Banner" key={property_id}>
                  <Grid container spacing={0} className="BannerGrid">
                    <Grid item xs={8}>
                      <CardMedia
                        className="Media"
                        image={url_image || house}
                        title={title}
                      >
                        <Typography className="MediaCaption">
                          {title}
                        </Typography>
                      </CardMedia>
                    </Grid>
                    <Grid item xs={4} key="content">
                      <CardContent className="Content">
                        <Typography className="Title">{title}</Typography>
                        <Typography>{location}</Typography>
                        <Typography className="Caption">
                          {description}
                        </Typography>
                        <Typography>
                          {parser.FormatPrice(price, i18n.language)}
                        </Typography>
                        <Button
                          variant="outlined"
                          className="ViewButton"
                          onClick={() => handleCLickProperty(property_id)}
                        >
                          View Now
                        </Button>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              )
            )}
          </Carousel>
          <Grid container item xs={8} py={5}>
            <Typography component="p" variant="subtitle1">
              Nos alegra que estés aquí. IdealistaWatch es tu nuevo aliado para
              encontrar y guardar las viviendas de tus sueños. Entendemos lo
              importante que es encontrar el lugar perfecto, ya sea tu primera
              casa, un nuevo hogar o una inversión. Por eso, hemos creado una
              plataforma intuitiva y fácil de usar que te permitirá gestionar y
              seguir de cerca todas tus opciones inmobiliarias.
            </Typography>
          </Grid>
          {/* <Grid */}
          {/*   container */}
          {/*   sx={{ */}
          {/*     minHeight: '75vh', */}
          {/*     mt: 4, */}
          {/*     mb: { md: 4, lg: 'auto' }, */}
          {/*   }} */}
          {/* > */}
          {/*   <Grid */}
          {/*     container */}
          {/*     item */}
          {/*     spacing={2} */}
          {/*     direction="row" */}
          {/*     justifyContent="left" */}
          {/*     pb={{ xs: 7, md: 5 }} */}
          {/*     alignItems="stretch" */}
          {/*   > */}
          {/*     {propertiesPage.map((property) => ( */}
          {/*       <Grid item xs={12} sm={6} lg={4} key={property.property_id}> */}
          {/*         <PropertyCard property={property} /> */}
          {/*       </Grid> */}
          {/*     ))} */}
          {/*   </Grid> */}
          {/* </Grid> */}
        </>
      )}
    </>
  );
};
export default App;
