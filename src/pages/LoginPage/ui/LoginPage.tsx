import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper, Container, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation, isAuthenticated } from 'shared/api/authApi';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Используем хук авторизации из RTK Query
  const [login, { isLoading }] = useLoginMutation();
  
  // Проверяем, авторизован ли пользователь
  useEffect(() => {
    if (isAuthenticated()) {
      const locationState = location.state as LocationState;
      const redirectPath = locationState?.from?.pathname || '/';
      navigate(redirectPath);
    }
  }, [location, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Вызываем мутацию для авторизации
      await login({ username, password }).unwrap();
      
      // Перенаправляем на запрошенную страницу или на главную
      const locationState = location.state as LocationState;
      const redirectPath = locationState?.from?.pathname || '/';
      navigate(redirectPath);
    } catch (err: any) {
      // Обрабатываем ошибку авторизации
      console.error('Ошибка авторизации:', err);
      if (err.status === 400) {
        setError('Неверный логин или пароль');
      } else if (err.status === 429) {
        setError('Слишком много попыток. Попробуйте позже.');
      } else {
        setError('Ошибка входа. Попробуйте позже.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            borderRadius: 2,
            backgroundColor: 'background.paper' 
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            Вход в систему доставки
          </Typography>
          
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Логин"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Войти'}
            </Button>
            
            <Typography variant="caption" align="center" display="block" sx={{ mt: 2 }}>
              Для входа используйте: admin / admin
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage; 