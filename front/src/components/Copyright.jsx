import { Link, Typography } from '@mui/material';
import { APP_NAME } from '@/commons/config/config.js';

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        {APP_NAME}{' '}
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
