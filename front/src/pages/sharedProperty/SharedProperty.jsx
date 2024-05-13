import PageLoader from '@/components/PageLoader';
import PropertyDetailsGlobal from '@/components/PropertyDetailsGlobal';
import propertyService from '@/services/propertyService';
import { Box, Container } from '@mui/material';
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
  if (loading) return <PageLoader />;
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <PropertyDetailsGlobal property={property} />
      </Box>
    </Container>
  );
};

export default SharedProperty;
