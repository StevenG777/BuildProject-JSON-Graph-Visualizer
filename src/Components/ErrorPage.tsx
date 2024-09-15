import React from 'react'
import { useRouteError } from "react-router-dom";
import { Container, Typography, Box, Button } from '@mui/material';

const ErrorPage: React.FC = (): JSX.Element => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      textAlign: 'center'
    }}
    >

        <Typography variant="h1" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="h6" paragraph>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="body1">
          <i>Error - {error.statusText || error.message}</i>
        </Typography>

        <Button 
          variant="contained" 
          color="primary" 
          href="/" 
          sx={{ mt: 3 }}
        >
          Go to Home Page
        </Button>

    </ Box>
  );
};

export default ErrorPage;