import React, { useState,useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Home from './Home';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signInLink: {
    marginTop: theme.spacing(2),
  },
}));

const LogIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const refresh_token = localStorage.getItem('refresh_token')
  useEffect(() => {
    if (refresh_token) {
      alert('You are already logged in. Redirecting to Home page.');
      setTimeout(() => {
        navigate('/');
      }, 100); // Add a small delay before navigation
    }
  }, [refresh_token, navigate]);
  const initialFormData = Object.freeze({
    email: '',
  });
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    
    axiosInstance
      .post('signin/', {
        email: formData.email,
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        console.log('Login Successful');
        navigate('/');
      })
      .catch((error) => {
        alert('Please enter correct email for login');
        console.error(error);
      });
  };

  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.signInLink}>
              <Link href="/register" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LogIn;
