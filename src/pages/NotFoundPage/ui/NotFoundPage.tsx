import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Error as ErrorIcon } from '@mui/icons-material';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate('/');
  };
  
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
        }}
      >
        <ErrorIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
        
        <Typography variant="h2" gutterBottom>
          404
        </Typography>
        
        <Typography variant="h4" gutterBottom>
          Страница не найдена
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '70%' }}>
          Похоже, что ты забрёл не туда, братишка. Такой страницы не существует, либо ты не имеешь к ней доступа.
        </Typography>
        
        <Button variant="contained" color="primary" size="large" onClick={handleGoBack}>
          Вернуться на главную
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
