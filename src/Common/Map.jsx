// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../axios';
// import axios from 'axios';

// const Map = () => {
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [description, setDescription] = useState('');
//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     // Get the user's current location using the geolocation API
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//         },
//         error => {
//           console.error('Error getting current location:', error);
//         }
//       );
//     }
//   }, []);

//   useEffect(() => {
//     if (markerPosition) {
//       const mapOptions = {
//         center: { lat: markerPosition.lat, lng: markerPosition.lng },
//         zoom: 19,
//       };

//       const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

//       const marker = new window.google.maps.Marker({
//         map,
//         position: markerPosition,
//         draggable: true,
//       });

//       marker.addListener('dragend', handleMarkerDragEnd);
//     }
//   }, [markerPosition]);

//   const handleConfirm = async () => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAwlaOn54SWFxclJZ7dBJ9sNFutLYcOwxA`
//       );
//       const { lat, lng } = response.data.results[0].geometry.location;
//       setMarkerPosition({ lat, lng });
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleMarkerDragEnd = async (event) => {
//     const { latLng } = event;
//     const newLatLng = { lat: latLng.lat(), lng: latLng.lng() };
//     setMarkerPosition(newLatLng);

//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLatLng.lat},${newLatLng.lng}&key=AIzaSyAwlaOn54SWFxclJZ7dBJ9sNFutLYcOwxA`
//       );
//       const firstResult = response.data.results[0];
//       if (firstResult) {
//         setAddress(firstResult.formatted_address);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  

//   const handleCreateParkingLot = async () => {
//     try {
//       if (markerPosition && name && address && description && imageFile) {
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('address', address);
//         formData.append('description', description);
//         formData.append('latitude', markerPosition.lat);
//         formData.append('longitude', markerPosition.lng);
//         formData.append('image', imageFile);

//         await axiosInstance.post('/parking_lot_create/', formData);
//         // Handle success or navigation after successful creation
//         alert('Parking lot created successfully');
//         setName('');
//         setAddress('');
//         setDescription('');
//         setMarkerPosition(null);
//         setImageFile(null);
//       } else {
//         alert('Please fill in all fields and select an image.');
//       }
//     } catch (error) {
//       alert('You are not admin to create the parking lot, please leave');
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Parking Lot Name"
//         />
//         <input
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           placeholder="Address"
//         />
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//           rows={4}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImageFile(e.target.files[0])}
//         />
//       </div>
//       <div id="map" style={{ height: '400px' }}></div>
//       <button className="parking-confirm-btn" onClick={handleConfirm}>Set Marker</button>
//       {markerPosition && (
//         <button className="parking-confirm-btn" onClick={handleCreateParkingLot}>Confirm Parking Lot</button>
//       )}
//     </div>
//   );
// };

// export default Map;


import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Get the user's current location using the geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        error => {
          console.error('Error getting current location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (markerPosition) {
      const mapOptions = {
        center: { lat: markerPosition.lat, lng: markerPosition.lng },
        zoom: 19,
      };

      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

      const marker = new window.google.maps.Marker({
        map,
        position: markerPosition,
        draggable: true,
      });

      marker.addListener('dragend', handleMarkerDragEnd);
    }
  }, [markerPosition]);

  const handleConfirm = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAwlaOn54SWFxclJZ7dBJ9sNFutLYcOwxA`
      );
      const { lat, lng } = response.data.results[0].geometry.location;
      setMarkerPosition({ lat, lng });
    } catch (error) {
      alert('Please Give Correct Coordinates')
      console.error('Error:', error);
    }
  };

  const handleMarkerDragEnd = async (event) => {
    const { latLng } = event;
    const newLatLng = { lat: latLng.lat(), lng: latLng.lng() };
    setMarkerPosition(newLatLng);

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLatLng.lat},${newLatLng.lng}&key=AIzaSyAwlaOn54SWFxclJZ7dBJ9sNFutLYcOwxA`
      );
      const firstResult = response.data.results[0];
      if (firstResult) {
        setAddress(firstResult.formatted_address);
      }
    } catch (error) {
      alert(error)
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('refresh_token')) {
      // Navigate to login if no refresh token
      navigate('/login');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        error => {
          alert('Error Getting current location')
          console.error('Error getting current location:', error);
        }
      );
    }
  }, [navigate]);

  const handleCreateParkingLot = async () => {
    try {
      if (markerPosition && name && address && description && imageFile) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('latitude', markerPosition.lat);
        formData.append('longitude', markerPosition.lng);
        formData.append('image', imageFile);

        await axiosInstance.post('/parking_lot_create/', formData);
        // Handle success or navigation after successful creation
        alert('Parking lot created successfully');
        setName('');
        setAddress('');
        setDescription('');
        setMarkerPosition(null);
        setImageFile(null);
      } else {
        alert('Please fill in all fields and select an image.');
      }
    } catch (error) {
      alert('You are not authorized to create the parking lot.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='map-div'>
      <div className="input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Parking Lot Name"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>
      <div id="map" style={{ height: '400px' }}></div>
      <div className="text-center">
      <button className="parking-confirm-btn" onClick={handleConfirm}>Set Marker</button>
      {markerPosition && (
        
        <button className="parking-confirm-btn" onClick={handleCreateParkingLot}>Confirm Parking Lot</button>
        
      )}
      </div>
    </div>
  );
};

export default Map;