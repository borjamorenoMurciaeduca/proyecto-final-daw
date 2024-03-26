import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Inmueble } from './inmueble/Inmueble';
import { Login } from './login/Login';

const App = () => {
  return (
    <>
      <Login />
      <Inmueble />
    </>
  );
};

export default App;
