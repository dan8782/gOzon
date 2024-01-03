// Импортируйте необходимые зависимости
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Container } from '@mui/material';
import HeaderBar from './HeaderBar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    // Создайте состояния для хранения имени пользователя и пароля
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Обработчик для отправки данных на сервер при входе
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', { name, password });

            if (response.status === 200) {
                localStorage.setItem('name', name);
                console.log('status200')
                navigate("/");
            }
        } catch (error) {
            console.error('Login failed', error);
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
                        Вход
                    </Typography>
                    <TextField
                        label="Имя"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={handleLogin}
                    >
                        Войти
                    </Button>
                    <Typography variant="body2" sx={{ marginTop: 2 }}>
                        Нет аккаунта?{' '}
                        <Link href="/signup" color="primary">
                            Зарегистрируйтесь
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default LoginPage;
