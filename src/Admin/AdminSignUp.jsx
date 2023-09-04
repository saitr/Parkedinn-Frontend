import React, { useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Typography,
    Container,
    CircularProgress,
  } from '@material-ui/core';

import axiosInstance from '../axios';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
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
    loadingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    },
    factsContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      fontSize: '40px', // Adjust the font size as needed
      zIndex: 10000, // Ensure that the facts are displayed above the loading overlay
    },
  }));


function AdminSignupForm() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        phone_number: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        axiosInstance
    .post('admin-signup/', formData)
    .then((response) => {
      console.log('Admin signup successful:', response.data);

      // Save tokens to localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      console.log('access_token',response.data.access_token)
      console.log('refresh_token',response.data.refresh_token);
      // Redirect or navigate to another page
      navigate('/allparkinglots');
    })
    .catch((error) => {
      console.error('Error during admin signup:', error);
    });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Admin Register
          </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                margin="normal"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                margin="normal"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Phone Number"
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                margin="normal"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                margin="normal"
            />
            </Grid>
            
            <Button type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
                Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            </Grid>
        </form>
        </div>
        </Container>
    );
}

export default AdminSignupForm;
