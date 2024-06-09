import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

const StepperEmpty = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { t } = useTranslation();

  const steps = [
    {
      label: t('stepper.p1_label'),
      description: t('stepper.p1_desc'),
    },
    {
      label: t('stepper.p2_label'),
      description: t('stepper.p2_desc'),
    },
    {
      label: t('stepper.p3_label'),
      description: t('stepper.p3_desc'),
    },
  ];

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t('stepper.title')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Box
          sx={{
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">
                        {t('stepper.last_step')}
                      </Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1
                          ? t('stepper.finish')
                          : t('stepper.continue')}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {t('stepper.previous')}
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>{t('stepper.done')}</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                {t('stepper.restart')}
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    </>
  );
};

export default StepperEmpty;
