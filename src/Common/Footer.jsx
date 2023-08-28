import React, { useState, useEffect } from 'react';
import Location from '../images/location.png'
import Call from "../images/call.png"
import Envelope from "../images/envelope.png"
import FB from "../images/fb.png"
import Twitter from '../images/twitter.png'
import Linkedin from "../images/linkedin.png"
import Insta from "../images/insta.png"

import axiosInstance from '../axios';
import {
  Typography,
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

function Footer() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
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

   const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/subscriber/', {
        email: formData.email,
      });
      console.log('Contact form submitted:', response.data);

      // Reset the form data
      setFormData({
        email: '',
      });

      // Optionally display a success message to the user
      alert('Thank you for subscribing!');

    } catch (error) {
      if (error.message) {
        alert('Error:' + error.message);
      } else {
        console.error('Error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
    <section class="info_section ">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <h6>
            Subscribe Now
          </h6>
          <p>
            There are many variations of passages of Lorem Ipsum available,
          </p>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your email" name='email' value={formData.email} onChange={handleInputChange} required className='contact-input'/>
            <div class="d-flex justify-content-end">
              <button>
                subscribe
              </button>
            </div>
          </form>
        </div>
        <div class="col-lg-2">
          <h6>
            Information
          </h6>
          <ul>
            <li>
              <a href="">
                There are many
              </a>
            </li>
            <li>
              <a href="">
                variations of
              </a>
            </li>
            <li>
              <a href="">
                passages of Lorem
              </a>
            </li>
            <li>
              <a href="">
                Ipsum available,
              </a>
            </li>
            <li>
              <a href="">
                but the majority
              </a>
            </li>
          </ul>
        </div>
        <div class="col-lg-2">
          <h6>
            Helpful Links
          </h6>
          <ul>
            <li>
              <a href="">
                There are many
              </a>
            </li>
            <li>
              <a href="">
                variations of
              </a>
            </li>
            <li>
              <a href="">
                passages of Lorem
              </a>
            </li>
            <li>
              <a href="">
                Ipsum available,
              </a>
            </li>
            <li>
              <a href="">
                but the majority
              </a>
            </li>
          </ul>
        </div>
        <div class="col-lg-2">
          <h6>
            Invesments
          </h6>
          <ul>
            <li>
              <a href="">
                There are many
              </a>
            </li>
            <li>
              <a href="">
                variations of
              </a>
            </li>
            <li>
              <a href="">
                passages of Lorem
              </a>
            </li>
            <li>
              <a href="">
                Ipsum available,
              </a>
            </li>
            <li>
              <a href="">
                but the majority
              </a>
            </li>
          </ul>
        </div>
        <div class="col-lg-2">
          <h6>
            Contact Us
          </h6>
          <div class="info_link-box">
            <a href="https://www.google.com/maps/dir/12.3558737,76.588695/Dollarbird+technologies+salary/@12.3557528,76.5860557,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3baf7a6099958b33:0xe0c6cacf9adde37e!2m2!1d76.5885713!2d12.3558259?entry=ttu">
              <img src={Location} alt=""/>
              <span> Location</span>
            </a>
            <a href="">
              <img src={Call} alt=""/> 
              <span>+91 7892098558</span>
            </a>
            <a href="mailto:saitreddy06@gmail.com">
              <img src={Envelope} alt=""/>
              <span> saitreddy06@gmail.com</span>
            </a>
          </div>
          <div class="info_social">
            <div>
              <a href="https://www.facebook.com/">
                <img src={FB} alt=""/>
              </a>
            </div>
            <div>
              <a href="https://twitter.com/i/flow/login">
                <img src={Twitter} alt=""/>
              </a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/sai-thimma-reddy-d-278ba4171/">
                <img src={Linkedin} alt=""/>
              </a>
            </div>
            <div>
              <a href="https://www.instagram.com/sai_t_reddy/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D">
                <img src={Insta} alt=""/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export default Footer