import { Container, Typography } from "@mui/material";
import LoginForm from "./components/LoginForm";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: " 100vh",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <Typography variant="h1">{t("login-form.title")}</Typography>
      <LoginForm />
    </Container>
  );
};

export default Login;
