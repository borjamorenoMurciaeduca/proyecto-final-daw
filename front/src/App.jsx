import { I18nextProvider } from 'react-i18next';
import i18n from './commons/i18n/i18n';
import { NotificationProvider } from './contexts/AppNotificationProvider';
import { ColorThemeProvider } from './contexts/ColorThemeProvider';
import { UserProvider } from './contexts/UserProvider';
import { ViviendasProvider } from './contexts/ViviendasProvider';
import Router from './router';

const App = () => {
  return (
    <ColorThemeProvider>
      <I18nextProvider i18n={i18n}>
        <ViviendasProvider>
          <UserProvider>
            <NotificationProvider>
              <Router />
            </NotificationProvider>
          </UserProvider>
        </ViviendasProvider>
      </I18nextProvider>
    </ColorThemeProvider>
  );
};

export default App;

// const { state, handleLogin } = useAppState();
// const navigate = useNavigate();

// useEffect(() => {
//   const loggedUserJSON = window.localStorage.getItem(USER_LOCAL_TOKEN);
//   if (loggedUserJSON) {
//     const { token } = JSON.parse(loggedUserJSON);
//     (async () => {
//       if (token) {
//         try {
//           // userService.setToken(token);
//           // propertyService.setToken(token);
//           const { data } = await userService.user();
//           handleLogin(data);
//           navigate('/app');
//         } catch (error) {
//           console.error('Error al obtener datos del usuario:', error);
//         }
//       }
//     })();
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
// if (loading) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: ' center',
//         alignItems: 'center',
//         minHeight: '100vh',
//       }}
//     >
//       <CircularProgress />
//     </Box>
//   );
// }
