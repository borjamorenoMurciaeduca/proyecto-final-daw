import { Container } from "@mui/material";
import { useEffect } from "react";
import Dashboard from "./dashboard/Dashboard";
import useAppStateHook from "./hooks/useAppStateHook";
import Login from "./login/Login";
import InmuebleService from "./services/inmuebleService";
import LoginService from "./services/loginService";
import TopMenu from "./topMenu/TopMenu";
import { I18nextProvider } from "react-i18next";
import i18n from "./commons/i18n/i18n";

const App = () => {
  const { state, handleLogin } = useAppStateHook();
  const { user } = state;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const { token } = JSON.parse(loggedUserJSON);
      const setLoginService = async () => {
        if (token) {
          try {
            LoginService.setToken(token);
            InmuebleService.setToken(token);
            const { data } = await LoginService.user();
            handleLogin(data);
          } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
          }
        }
      };
      setLoginService();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Aquí se maneja el estado de la app, si el usuario existe y esta en el estado global
  // se muestra la vista de la "app" o la vista del login
  return (
    <>
      <I18nextProvider i18n={i18n}>
        {user ? (
          <>
            <TopMenu />
            <Container maxWidth="lg">
              <Dashboard />
            </Container>
          </>
        ) : (
          <Login />
        )}
      </I18nextProvider>
    </>
  );
};

export default App;
