import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg height="20" width="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 435.723 435.722" xml:space="preserve" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="${encodeURIComponent(
          '#fff'
        )}" d="M428.787,48.602l-102.911,167.64c-3.815,6.223-11.295,7.229-16.612,2.251L259.487,171.9 c-5.324-4.978-12.981-4.087-17.007,1.999l-69.87,105.38c-4.032,6.079-11.744,7.031-17.129,2.122l-32.545-29.676 c-5.393-4.909-13.532-4.277-18.095,1.415L2.373,380.912c-4.57,5.691-2.333,10.35,4.943,10.35h428.407V50.567 C435.723,43.278,432.595,42.38,428.787,48.602z"></path> </g> </g></svg>')`,
      },

      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg height="20" width="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 435.723 435.722" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="${encodeURIComponent(
        '#fff'
      )}" d="M428.787,48.602l-102.911,167.64c-3.815,6.223-11.295,7.229-16.612,2.251L259.487,171.9 c-5.324-4.978-12.981-4.087-17.007,1.999l-69.87,105.38c-4.032,6.079-11.744,7.031-17.129,2.122l-32.545-29.676 c-5.393-4.909-13.532-4.277-18.095,1.415L2.373,380.912c-4.57,5.691-2.333,10.35,4.943,10.35h428.407V50.567 C435.723,43.278,432.595,42.38,428.787,48.602z"></path> </g> </g></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function SwitchDate({ toggleDateOrder, dateOrder }) {
  return (
    <FormControlLabel
      component="fieldset"
      onChange={toggleDateOrder}
      label={`Fecha ${dateOrder == 'asc' ? 'asc' : 'desc'}`}
      control={
        <MaterialUISwitch
          sx={{ m: 1 }}
          checked={dateOrder == 'desc' ? true : false}
        />
      }
    />
  );
}
