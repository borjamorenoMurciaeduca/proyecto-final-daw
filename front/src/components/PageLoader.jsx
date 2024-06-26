import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const PageLoader = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
