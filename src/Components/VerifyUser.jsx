// import React, { useState } from 'react';
// import axiosInstance from '../axios';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Grid,
//   Typography,
//   Container,
// } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   // Your styles here
// }));

// const VerifyPage = () => {
//   const navigate = useNavigate();

//   const [otp, setOtp] = useState('');
//   const location = useLocation();

//   const handleVerify = () => {
//     const email = location.state.email;

//     axiosInstance
//       .post(`verify/${email}/`, { otp: otp }) // Send email and OTP in the request body
//       .then((res) => {
//         localStorage.setItem('access_token', res.data.access);
//         localStorage.setItem('refresh_token', res.data.refresh);
//         navigate('/');
//         console.log(res);
//       })
//       .catch((error) => {
//         // Handle verification error
//         alert(error);

//         console.error(error);
//       });
//   };

//   const classes = useStyles();

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}></Avatar>
//         <Typography component="h1" variant="h5">
//           Verify OTP
//         </Typography>
//         <form className={classes.form} noValidate>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="otp"
//                 label="OTP"
//                 name="otp"
//                 autoComplete="off"
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//             onClick={handleVerify}
//           >
//             Verify
//           </Button>
//         </form>
//       </div>
//     </Container>
//   );
// };

// export default VerifyPage;




// import React, { useState } from 'react';
// import axiosInstance from '../axios';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import SuperCarGif from '../images/supercar-bg.gif'

// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   Grid,
//   Typography,
//   Container,
//   makeStyles,
//   TextField,
// } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   otpInput: {
//     width: '40px',
//     marginRight: '10px',
//     textAlign: 'center',
//   },
  
// }));

// const VerifyPage = () => {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array to store each digit of OTP
//   const location = useLocation();
//   const classes = useStyles();
//   const [loading, setLoading] = useState(false);


//   const handleDigitChange = (index, value) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//   };

//   const handleVerify = () => {
//     const email = location.state.email;
//     const enteredOtp = otp.join('');
//     // e.preventDefault();
//     setLoading(true);

//     axiosInstance
//       .post(`verify/${email}/`, { otp: enteredOtp })
//       .then((res) => {
//         localStorage.setItem('access_token', res.data.access);
//         localStorage.setItem('refresh_token', res.data.refresh);
//         navigate('/');
//       })
//       .catch((error) => {
//         alert('Please Enter Correct OTP');
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       {loading && (
//           <div className={classes.loadingOverlay}>
//             <img src={SuperCarGif} alt="Loading" />
//           </div>
//         )}
    
//     <Container component="main" maxWidth="xs" >
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}></Avatar>
//         <Typography component="h1" variant="h5">
//           Enter Your OTP Here
//         </Typography>
//         <form className={classes.form} noValidate>
//           <Grid container spacing={2}>
//             {otp.map((digit, index) => (
//               <Grid item xs={2} key={index}>
//                 <TextField
//                   className={classes.otpInput}
//                   variant="outlined"
//                   required
//                   value={digit}
//                   onChange={(e) => handleDigitChange(index, e.target.value)}
//                   inputProps={{
//                     maxLength: 1,
//                   }}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//           <Button
//             type="button"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//             onClick={handleVerify}
//           >
//             Verify
//           </Button>
//         </form>
//       </div>
//     </Container>
//     </div>
//   );
// };

// export default VerifyPage;



import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SuperCarGif from '../images/Spinner-2.gif';

import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
  makeStyles,
  TextField,
} from '@material-ui/core';

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
  otpInput: {
    width: '40px',
    marginRight: '10px',
    textAlign: 'center',
  },

  // Add a new class for the loading overlay
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
   factsContainer: {
    position: 'absolute',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    padding: theme.spacing(2),
    zIndex: 10000, // Ensure that the facts are displayed above the loading overlay
  },
}));

const VerifyPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array to store each digit of OTP
  const location = useLocation();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
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

  const handleDigitChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const email = location.state.email;
    const enteredOtp = otp.join('');
    setLoading(true);

    axiosInstance
      .post(`verify/${email}/`, { otp: enteredOtp })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        navigate('/');
      })
      .catch((error) => {
        alert('Please Enter Correct OTP');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Enter Your OTP Here
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              {otp.map((digit, index) => (
                <Grid item xs={2} key={index}>
                  <TextField
                    className={classes.otpInput}
                    variant="outlined"
                    required
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    inputProps={{
                      maxLength: 1,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleVerify}
            >
              Verify
            </Button>
          </form>
        </div>
      </Container>

      {/* Display loading overlay when loading is true */}
      {loading && (
        <div className={classes.loadingOverlay}>
          <div className={classes.factsContainer}>
            <img src={SuperCarGif} alt="Loading" />
            <Typography variant="h6">{randomFact}</Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
