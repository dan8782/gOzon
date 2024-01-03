import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Container } from '@mui/material';
import HeaderBar from './HeaderBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password === repeatPassword) {
      try {
        // Replace the endpoint with your actual registration endpoint
        const response = await axios.post('http://localhost:3001/signup', { name, password });

        if (response.status === 200) {
          localStorage.setItem('name', name);
          console.log('Registration successful');
          navigate('/login');
        }
      } catch (error) {
        console.error('Registration failed', error);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
      <HeaderBar />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            boxShadow: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Регистрация
          </Typography>
          <TextField
            label="Имя"
            margin="normal"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Пароль"
            type="password"
            margin="normal"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Повторите пароль"
            type="password"
            margin="normal"
            variant="outlined"
            fullWidth
            error={!passwordsMatch}
            helperText={!passwordsMatch && 'Пароли не совпадают'}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleSignUp}
          >
            Зарегистрироваться
          </Button>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Уже есть аккаунт?{' '}
            <Link href="/login" color="primary">
              Войти
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpPage;
