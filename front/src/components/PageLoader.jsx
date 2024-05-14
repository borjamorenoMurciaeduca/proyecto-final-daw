import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const PageLoader = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // minHeight: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
