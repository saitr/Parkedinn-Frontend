// import React, { useState } from 'react';
// import axiosInstance from '../axios';
// import {useNavigate} from 'react-router-dom';
// import {
//     Avatar,
//     Button,
//     CssBaseline,
//     TextField,
//     FormControlLabel,
//     Checkbox,
//     Link,
//     Grid,
//     Typography,
//     Container,
//   } from '@material-ui/core';
//   import { makeStyles } from '@material-ui/core/styles';



// const useStyles = makeStyles((theme) => ({
// 	paper: {
// 		marginTop: theme.spacing(8),
// 		display: 'flex',
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 	},
// 	avatar: {
// 		margin: theme.spacing(1),
// 		backgroundColor: theme.palette.secondary.main,
// 	},
// 	form: {
// 		width: '100%', // Fix IE 11 issue.
// 		marginTop: theme.spacing(3),
// 	},
// 	submit: {
// 		margin: theme.spacing(3, 0, 2),
// 	},
// }));

// export default function SignUp() {
// 	// const history = useHistory();
//     const navigate = useNavigate();
// 	const initialFormData = Object.freeze({
// 		email: '',
// 		username: '',
// 		phone_number: '',
// 	});

// 	const [formData, updateFormData] = useState(initialFormData);

// 	const handleChange = (e) => {
// 		updateFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		console.log(formData);

// 		axiosInstance
// 			.post(`signup/`, {
// 				email: formData.email,
// 				username: formData.username,
// 				phone_number: formData.phone_number,
// 			})
// 			.then((res) => {
// 				// navigate('/verify/', { state: { email: formData.email } });
// 				// console.log(res);
// 				// console.log(res.data);
// 				const verificationUrl = `/verify/${formData.email}/`;
//                 navigate(verificationUrl,{ state: { email: formData.email } });
//                 console.log(res);
//                 console.log(res.data);
// 			}).catch((error)=>{
// 				alert('Username or Email already Exists')
// 				console.log('Username or Email already exists')
// 			});
// 	};

// 	const classes = useStyles();

// 	return (
// 		<Container component="main" maxWidth="xs">
// 			<CssBaseline />
// 			<div className={classes.paper}>
// 				<Avatar className={classes.avatar}></Avatar>
// 				<Typography component="h1" variant="h5">
// 					Sign up
// 				</Typography>
// 				<form className={classes.form} noValidate>
// 					<Grid container spacing={2}>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								id="email"
// 								label="Email Address"
// 								name="email"
// 								autoComplete="email"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								id="username"
// 								label="Username"
// 								name="username"
// 								autoComplete="username"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								name="phone_number"
// 								label="Phone Number"
// 								type="phone_number"
// 								id="password"
// 								// autoComplete="current-password"
// 								onChange={handleChange}
// 							/>
// 						</Grid>
// 						{/* <Grid item xs={12}>
// 							<FormControlLabel
// 								control={<Checkbox value="allowExtraEmails" color="primary" />}
// 								label="I want to receive inspiration, marketing promotions and updates via email."
// 							/>
// 						</Grid> */}
// 					</Grid>
// 					<Button
// 						type="submit"
// 						fullWidth
// 						variant="contained"
// 						color="primary"
// 						className={classes.submit}
// 						onClick={handleSubmit}
// 					>
// 						Sign Up
// 					</Button>
// 					<Grid container justify="flex-end">
// 						<Grid item>
// 							<Link href="/login" variant="body2">
// 								Already have an account? Sign in
// 							</Link>
// 						</Grid>
// 					</Grid>
// 				</form>
// 			</div>
// 		</Container>
// 	);
// }


import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
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
import { makeStyles } from '@material-ui/core/styles';
import SuperCarGif from '../images/Spinner-2.gif'
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

export default function SignUp() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone_number: '',
  });
  const [facts, setFacts] = useState([
    'The first automobile was built in 1885.',
    'The fastest car in the world is the Bugatti Chiron Super Sport 300+.',
    'The average car has around 30,000 parts.',
    'The world record for the longest jump by a car is 332 feet.',
    'The original Volkswagen Beetle is the most-manufactured car of a single platform.',
    'The Lamborghini company started by making tractors.',
    'The first speeding ticket was issued in 1902.',
    'The Porsche 911 has been in production since 1964.',
    'The Aston Martin logo is based on the wings of a bird.',
    'The first car radio was invented in 1929.',
  ]);
  const [randomFact, setRandomFact] = useState('');
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);
  }, [facts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('signup/', {
        email: formData.email,
        username: formData.username,
        phone_number: formData.phone_number,
      });

      const verificationUrl = `/verify/${formData.email}/`;
      navigate(verificationUrl, { state: { email: formData.email } });

      console.log('Success:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className={classes.loadingOverlay}>
          <div className={classes.factsContainer}>
            <img src={SuperCarGif} alt="Loading" />
            <Typography variant="h6">{randomFact}</Typography>
          </div>
        </div>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="phone_number"
                  label="Phone Number"
                  type="tel"
                  id="phone_number"
                  autoComplete="tel"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
