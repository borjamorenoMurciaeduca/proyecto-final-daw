import { I18nextProvider } from 'react-i18next';
import i18n from './commons/i18n/i18n';
import { NotificationProvider } from './contexts/AppNotificationProvider';
import { ColorThemeProvider } from './contexts/ColorThemeProvider';
import { PropertiesProvider } from './contexts/PropertiesProvider';
import { UserProvider } from './contexts/UserProvider';
import Router from './router';

const App = () => {
  return (
    <ColorThemeProvider>
      <I18nextProvider i18n={i18n}>
        <PropertiesProvider>
          <UserProvider>
            <NotificationProvider>
              <Router />
            </NotificationProvider>
          </UserProvider>
        </PropertiesProvider>
      </I18nextProvider>
    </ColorThemeProvider>
  );
};

export default App;
