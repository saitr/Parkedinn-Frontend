import React, { useState, useEffect } from 'react';
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
function Contact() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    message: '',
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
      const response = await axiosInstance.post('/contactus/', {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        message: formData.message,
      });
      console.log('Contact form submitted:', response.data);

      // Reset the form data
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        message: '',
      });

      // Optionally display a success message to the user
      alert('Thank you for contacting us!');

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
    <section className="contact_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>Contact Us</h2>
        </div>
        <div className="">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="contact_form-container">
                  <div>
                    <div>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className='contact-input'
                    />
                    </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='contact-input'

                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      required
                      className='contact-input'

                    />
                  </div>
                  <div>
                    <input
                    type='text'
                      placeholder="Message"
                      className='contact-input'
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mt-5 d-flex justify-content-center ">
                    <button type="submit">
                      Submit
                    </button>
                  </div>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default Contact;
