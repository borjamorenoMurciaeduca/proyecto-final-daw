import { I18nextProvider } from 'react-i18next';
import i18n from './commons/i18n/i18n';
import { UserProvider } from './context/userProvider';
import Router from './router';

const App = () => {
  // const { state, handleLogin } = useAppState();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem(USER_LOCAL_TOKEN);
  //   if (loggedUserJSON) {
  //     const { token } = JSON.parse(loggedUserJSON);
  //     (async () => {
  //       if (token) {
  //         try {
  //           // LoginService.setToken(token);
  //           // InmuebleService.setToken(token);
  //           const { data } = await LoginService.user();
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

  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <Router />
      </UserProvider>
    </I18nextProvider>
  );
};

export default App;

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
