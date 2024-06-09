import PageLoader from '@/components/PageLoader';
import PropertyDetailsGlobal from '@/components/PropertyDetailsGlobal';
import useProperties from '@/hooks/useProperties';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DialogShare from './DialogShare';

const PropertyDetails = ({ propertyId }) => {
  const [property, setProperty] = useState();
  const [open, setOpen] = useState(false);
  const { properties } = useProperties();
  const navigate = useNavigate();

  useEffect(() => {
    const propertyMatch = properties.find((el) => el.property_id == propertyId);
    !propertyMatch ? navigate('/404') : setProperty(propertyMatch);
  }, [propertyId, properties, navigate]);

  if (!property) return <PageLoader />;

  return (
    <>
      <PropertyDetailsGlobal
        property={property}
        setOpen={setOpen}
        enableShare
      />
      <DialogShare
        open={open}
        setOpen={setOpen}
        propertyId={propertyId}
        isShared={property.is_shared}
        propertyURL={property.share_url}
      />
    </>
  );
};

export default PropertyDetails;
