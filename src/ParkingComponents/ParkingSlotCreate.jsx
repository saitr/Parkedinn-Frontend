import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
  },
}));

function ParkingSlotCreate() {
  const classes = useStyles();
  const [parkingLot, setParkingLot] = useState(''); // Change this to an empty string
  const [slotNumber, setSlotNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('Two Wheeler');
  const [parkingLots, setParkingLots] = useState([]);

  useEffect(() => {
    // Fetch the list of parking lots based on the user logged in.
    // Adjust the API endpoint to match your Django backend.
    axiosInstance.get('parking_lot_list/')
      .then((response) => {
        setParkingLots(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a parking lot is selected
    if (!parkingLot) {
      alert('Please select a parking lot.');
      return;
    }

    const newSlot = {
      parking_lot: parkingLot, // Use the selected parking lot directly
      slot_number: slotNumber,
      parking_slot_type: vehicleType,
    };

    try {
      await axiosInstance.post('parking-slot-create/', newSlot);
      alert('New parking slot created successfully!');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 m-5">
        <div className={classes.formContainer}>
          <div
            className="heading_container"
            style={{ padding: '2%', justifyContent: 'center' }}
          >
            <h2>Parking Slots</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Select Parking Lot</InputLabel>
                  <Select
                    value={parkingLot}
                    onChange={(e) => setParkingLot(e.target.value)}
                    required
                  >
                    <MenuItem value="">Select a Parking Lot</MenuItem>
                    {parkingLots.map((lot) => (
                      <MenuItem key={lot.id} value={lot.id}>
                        {lot.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <TextField
                    label="Slot Number"
                    type="text"
                    value={slotNumber}
                    onChange={(e) => setSlotNumber(e.target.value)}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  {/* <InputLabel>Vehicle Type</InputLabel> */}
                  <Select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <MenuItem value="Two Wheeler">Two Wheeler</MenuItem>
                    <MenuItem value="Four Wheeler">Four Wheeler</MenuItem>
                    <MenuItem value="Heavy Vehicle">Heavy Vehicle</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <div className="d-flex justify-content-center m-3">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Create Parking Slot
                </Button>
              </div>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ParkingSlotCreate;
