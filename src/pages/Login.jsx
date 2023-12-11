import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BookIcon from '@mui/icons-material/Book';
import httpService from '../services/httpService';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); 
  const [lastLoginAttempt, setLastLoginAttempt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (lastLoginAttempt && Date.now() - lastLoginAttempt < 8000) {
      toast("Aguarde 8 segundos para tentar novamente");
      return;
    }

    setLastLoginAttempt(Date.now());

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await httpService.login(data);
      const result = await response.json();
      if (result["Access-Token"]) {
        localStorage.setItem("token", `Bearer ${result["Access-Token"]}`);
        navigate("/App");
      } else {
        toast(result.message);
      }
    } catch (err) {
      toast("Erro desconhecido");
    }
  };

  const defaultTheme = createTheme({
    palette: {
      primary: { main: blue[800] },
      secondary: { main: red[300] },
    },
  });

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" sx={{ mt: 10 }}>
          <Box flexDirection="column" display="flex" alignItems="center" justifyContent="center">
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <BookIcon />
            </Avatar>
              <h3>Biblioteca Tech</h3>
            <Typography variant='h5'>
              Entrar
            </Typography>

            <Box component="form" onSubmit={handleSubmit} width="40%" flexDirection="column" display="flex" alignItems="center" justifyContent="center">
              <TextField required fullWidth margin="normal" name="email" type="email" label="Email" />
              <TextField required fullWidth margin="normal" name="password" type="password" label="Password" />
              <Button type="submit" fullWidth sx={{ bgcolor: "primary.main", mt: 5 }} variant='contained'> Enviar </Button>
              <Grid sx={{ mt: 2 }} container>
                <Grid item xs={8}>
                  <Link to="/Register">Não possui conta? Crie uma conta </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        {lastLoginAttempt && <ToastContainer />}
      </ThemeProvider>
    </>
  );
};

export default Login;
