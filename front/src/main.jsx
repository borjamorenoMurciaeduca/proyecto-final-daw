import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import AppWithTheme from './AppWithTheme.jsx';
import { AppDarkModeProvider } from './context/AppDarkModeProvider.jsx';
import { NotificationProvider } from './context/AppNotificationContext.jsx';
import { AppProvider } from './context/AppProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <AppDarkModeProvider>
        <NotificationProvider>
          <AppWithTheme />
        </NotificationProvider>
      </AppDarkModeProvider>
    </AppProvider>
  </StrictMode>
);
