import PageLoader from '@/components/PageLoader';
import PropertyDetailsGlobal from '@/components/PropertyDetailsGlobal';
import propertyService from '@/services/propertyService';
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SharedProperty = () => {
  const [property, setProperty] = useState();
  const [loading, setLoading] = useState(true);
  const { shared_url } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const property = await propertyService.getShareProperty(shared_url);
        setProperty(property.data);
        console.log(property);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [shared_url]);

  if (loading && !property) return <PageLoader />;
  if (!loading && !property) return <Typography variant="h4">No se encontró la propiedad compartida</Typography>;

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>Vivienda compartida por {property.username}</Typography>
        <PropertyDetailsGlobal property={property} />
      </Box>
    </Container>
  );
};

export default SharedProperty;
