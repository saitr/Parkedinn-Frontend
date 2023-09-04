import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axiosInstance from '../axios';
import MenuItem from '@material-ui/core/MenuItem';

function ParkingRateForm() {
    const [parkingLots, setParkingLots] = useState([]);
    const [selectedParkingLot, setSelectedParkingLot] = useState(null);
    const [selectedVehicleType, setSelectedVehicleType] = useState('Two Wheeler');
    const [rates, setRates] = useState({
        upto_1_hr: '',
        above_1_hr_upto_5_hr: '',
        above_5_hr_and_upto_24_hr: '',
        above_1_day_and_upto_3_days: '',
        above_3_days_and_upto_7_days: '',
        above_1_week_and_upto_2_weeks: '',
        above_2_week_and_upto_1_month: '',
    });

    useEffect(() => {
        axiosInstance.get('parking_lot_list/')
            .then(response => {
                setParkingLots(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleFormSubmit = event => {
        // event.preventDefault();
        
        // Make sure selectedParkingLot is not null
        if (!selectedParkingLot) {
            console.error('Selected parking lot is null.');
            return;
        }

        // Prepare the data
        const data = {
            vehicle_type: selectedVehicleType,
            parking_lot: selectedParkingLot.id, // Use the ID here
            ...rates,
        };

        axiosInstance.post('parking_rates_all/', data)
            .then(response => {
                console.log('Data submitted successfully:', response.data);
            })
            .catch(error => {
                alert("Error submitting form");
                console.error('Error submitting data:', error);
            });
        window.location.reload()
    };
    // console.log('Data to be submitted:', data);
    return (
        <div className="parking_rates_div">
        <form onSubmit={handleFormSubmit} className='parking_rates_form'>
        <Autocomplete
            options={parkingLots}
            getOptionLabel={option => option.name}
            onChange={(event, newValue) => {
                console.log('Autocomplete Change:', newValue); // Debug
                setSelectedParkingLot(newValue);
            }}
            renderInput={params => <TextField {...params} label="Parking Lot" variant="outlined" />}
        />
            <TextField
                select
                label="Vehicle Type"
                value={selectedVehicleType}
                onChange={event => setSelectedVehicleType(event.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            >
                {['Two Wheeler', 'Four Wheeler', 'Heavy Vechiles'].map(type => (
                    <MenuItem key={type} value={type}>
                        {type}
                    </MenuItem>
                ))}
            </TextField>
            {Object.entries(rates).map(([key, value]) => (
                <TextField
                    key={key}
                    label={key.replace(/_/g, ' ')}
                    value={value}
                    onChange={event => setRates(prevRates => ({ ...prevRates, [key]: event.target.value }))}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
            ))}
            <div className="text-center m-3">
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
            </div>
        </form>
        </div>
    );
}

export default ParkingRateForm;




















