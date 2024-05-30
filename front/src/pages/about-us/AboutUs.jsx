import GitHubIcon from '@mui/icons-material/GitHub';
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './styles.css';
import ApacheSvg from './svgs/ApacheSvg';
import GitHubSvg from './svgs/GitHubSvg';
import GitSvg from './svgs/GitSvg';
import LaravelSvg from './svgs/LaravelSvg';
import LinuxSvg from './svgs/LinuxSvg';
import MySqlSvg from './svgs/MySqlSvg';
import PythonSvg from './svgs/PythonSvg';
import ReactSvg from './svgs/ReactSvg';

const AboutUs = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        minHeight: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid item xs={12} md={8}>
        <Paper sx={{ padding: 2 }} elevation={24}>
          <Typography variant="h3">🚀 About Us</Typography>
          <Box py={2}>
            <Typography variant="body1">
              Somos dos estudiantes del CIFP La Conservera (ext. IES Los
              Albares), del ciclo formativo de{' '}
              <b>Desarrollo de Aplicaciones Web (DAW)</b>.
            </Typography>
            <Typography component="p" variant="h6">
              🧑‍🎓 Borja Moreno <small>y</small> 🧑‍🎓 Jorge M. Balibrea.
            </Typography>
            <Typography>
              Este es nuestro proyecto final, <b>IdealistaWatch</b>.
            </Typography>
          </Box>
          <Divider>
            <strong>📑Historia</strong>
          </Divider>
          <Typography variant="body1" mb={1}>
            Nuestra app nace de la idea de proporcionar una manera fácil y
            atractiva para que los usuarios puedan recopilar datos de Idealista
            y ofrecer una visión clara de los precios de las viviendas.{' '}
            <strong>IdealistaWatch</strong> permite filtrar tus viviendas por{' '}
            <strong>precio</strong>, <strong>fecha</strong>,{' '}
            <strong>lugar</strong> e incluso guardarlas en{' '}
            <strong>favoritos</strong>, accediendo de una manera más fácil y
            rápida a tus propiedades guardadas. Además, permite guardar las
            propiedades de manera sencilla, haciendo uso de{' '}
            <strong>web-scrapping</strong> autorellenando los datos.
          </Typography>
          <Typography variant="body1" mb={1}>
            Por otro lado, <strong>IdealistaWatch</strong> ofrece una capa
            adicional de seguridad al ser una página "privada" que requiere
            usuario y contraseña para acceder. Sin embargo, podrás compartir tu
            vivienda con quien quieras si la pones como "pública", creando un
            enlace público para compartir fácilmente con amigos, familiares o
            posibles interesados.
          </Typography>
          <Paper
            variant="elevation"
            elevation={1}
            square={false}
            sx={{ mb: 2 }}
          >
            <Typography variant="body2" className="quote">
              El reto de hacer la app en conjunto y trabajar con Git y GitHub
              nos llamó la atención. Esto nos permitió colaborar de manera
              eficiente y gestionar el desarrollo de la aplicación de manera
              organizada y estructurada.
            </Typography>
          </Paper>
          <Divider>
            ⚙️ 💻<strong>Tecnologías usadas</strong>
          </Divider>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            my={2}
            flexWrap="wrap"
          >
            <ReactSvg />
            <LaravelSvg />
            <PythonSvg />
            <MySqlSvg />
            <ApacheSvg />
            <LinuxSvg />
            <GitHubSvg />
            <GitSvg />
          </Stack>
          <Typography component="p" variant="subtitle2" mb={1}>
            <strong>
              Nos apasiona desarrollar soluciones tecnológicas que hagan la vida
              más fácil y estamos emocionados de compartir nuestro proyecto
              contigo.
            </strong>
          </Typography>
          <Stack pt={2} spacing={2} direction={'row'}>
            <Link href={'https://github.com/bomobu'} target="_blank">
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                size={
                  useMediaQuery(theme.breakpoints.down('sm'))
                    ? 'small'
                    : 'medium'
                }
              >
                bomobu
              </Button>
            </Link>
            <Link href={'https://github.com/jbalibrea1'} target="_blank">
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                size={
                  useMediaQuery(theme.breakpoints.down('sm'))
                    ? 'small'
                    : 'medium'
                }
              >
                jbalibrea1
              </Button>
            </Link>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
