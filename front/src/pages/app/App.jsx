import house from '@/assets/house.jpg';
import i18n from '@/commons/i18n/i18n';
import AddButtonModal from '@/components/AddButtonModal';
import StepperEmpty from '@/components/StepperEmpty';
import useProperties from '@/hooks/useProperties';
import useUser from '@/hooks/useUser';
import parser from '@/utils/parser';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import './style.css';

const App = () => {
  const { properties } = useProperties();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUser();

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
                    <Grid item xs={0} md={8}>
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
                    <Grid item xs={12} md={4}>
                      <CardContent
                        className="Content"
                        sx={{
                          background: {
                            xs: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${url_image}) center/cover`,
                            md: 'none',
                          },
                        }}
                      >
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
                          {t('page.home.carousel.button.view-text')}
                        </Button>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              )
            )}
          </Carousel>
          <Grid container item xs={12} md={8} py={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h2">
                {t('page.home.welcome.title')} {user.username || 'Usuario'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="overline">
                {t('page.last-properties.title')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="p" variant="subtitle1">
                {t('page.home.welcome.paragraph')}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
export default App;

//          <Grid
//            container
//            sx={{
//              minHeight: '75vh',
//              mt: 4,
//              mb: { md: 4, lg: 'auto' },
//            }}
//          >
//            <Grid
//              container
//              item
//              spacing={2}
//              direction="row"
//              justifyContent="left"
//              pb={{ xs: 7, md: 5 }}
//              alignItems="stretch"
//            >
//              {propertiesPage.map((property) => (
//                <Grid item xs={12} sm={6} lg={4} key={property.property_id}>
//                  <PropertyCard property={property} />
//                </Grid>
//              ))}
//            </Grid>
//          </Grid>
//
