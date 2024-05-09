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
