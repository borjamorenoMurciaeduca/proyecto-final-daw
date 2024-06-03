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
import { Trans, useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <Grid
      container
      sx={{
        minHeight: `calc(100vh - 101px)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid item xs={12} md={8}>
        <Paper sx={{ padding: 1.5 }} elevation={24}>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: '2.5rem',
                sm: '3.75rem',
              },
            }}
          >
            🚀 About Us
          </Typography>
          <Box py={2}>
            <Typography variant="body1">
              <Trans
                t={t}
                i18nKey="about-us.paragraphs.p1"
                components={{ strong: <strong /> }}
              />
            </Typography>
            <Typography component="p" variant="h6">
              <Trans
                i18nKey="about-us.paragraphs.p2"
                components={{ small: <small /> }}
              />
            </Typography>
            <Typography>
              <Trans
                i18nKey="about-us.paragraphs.p3"
                components={{ strong: <strong /> }}
              />
            </Typography>
          </Box>
          <Divider>
            <Trans
              i18nKey="about-us.history.title"
              components={{ strong: <strong /> }}
            />
          </Divider>
          <Typography variant="body1" mb={1}>
            <Trans
              i18nKey="about-us.history.p1"
              components={{ strong: <strong /> }}
            />
          </Typography>
          <Typography variant="body1" mb={1}>
            <Trans
              i18nKey="about-us.history.p2"
              components={{ strong: <strong /> }}
            />
          </Typography>
          <Paper
            variant="elevation"
            elevation={1}
            square={false}
            sx={{ mb: 2 }}
          >
            <Typography variant="body2" className="quote">
              <Trans
                i18nKey="about-us.history.p3"
                components={{ strong: <strong /> }}
              />
            </Typography>
          </Paper>
          <Divider>
            <Trans
              i18nKey="about-us.technologies.title"
              components={{ strong: <strong /> }}
            />
          </Divider>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            my={2}
            useFlexGap
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
            <Trans
              i18nKey="about-us.technologies.p1"
              components={{ strong: <strong /> }}
            />
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
