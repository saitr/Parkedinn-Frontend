// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import L from 'leaflet'; // Import Leaflet
// import axiosInstance from '../axios'; // Import your Axios instance

// import userLocationIcon from '../images/user.png'; // Change this to your user location icon path
// import parkingLotIcon from '../images/parking.png'; // Change this to your parking lot icon path

// function ParkingLotDetails() {
//   const { parkingLotId } = useParams();
//   const [userLocation, setUserLocation] = useState(null);
//   const [parkingLotCoordinates, setParkingLotCoordinates] = useState(null);
//   const [showDirections, setShowDirections] = useState(false); // State to control directions display

//   useEffect(() => {
//     // Fetch user's location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//           // Fetch parking lot details and coordinates from backend
//           fetchParkingLotDetails(parkingLotId, { lat: latitude, lng: longitude });
//         },
//         error => {
//           console.error('Error getting current location:', error);
//         }
//       );
//     }
//   }, [parkingLotId]);

//   const fetchParkingLotDetails = async (id, location) => {
//     try {
//       const response = await axiosInstance.get(`parking-lots/${id}/`);
//       const parkingLot = response.data;
//       setParkingLotCoordinates({ lat: parkingLot.latitude, lng: parkingLot.longitude });
//     } catch (error) {
//       console.error('Error fetching parking lot details:', error);
//     }
//   };

//   const handleShowDirections = () => {
//     setShowDirections(true);
//   };

//   return (
//     <div>
//       <h1>Parking Lot Details</h1>
//       <button onClick={handleShowDirections}>Show Directions</button>
//       {userLocation && (
//         <MapContainer center={userLocation} zoom={15} style={{ height: '500px', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           {/* Display user marker */}
//           <Marker position={userLocation} icon={L.icon({ iconUrl: userLocationIcon, iconSize: [32, 32] })}>
//             <Popup>Your Location</Popup>
//           </Marker>

//           {/* Display parking lot marker */}
//           {parkingLotCoordinates && (
//             <Marker position={parkingLotCoordinates} icon={L.icon({ iconUrl: parkingLotIcon, iconSize: [32, 32] })}>
//               <Popup>Parking Lot</Popup>
//             </Marker>
//           )}

//           {/* Display route */}
//           {showDirections && userLocation && parkingLotCoordinates && (
//             <Polyline
//               positions={[
//                 [userLocation.lat, userLocation.lng],
//                 [parkingLotCoordinates.lat, parkingLotCoordinates.lng]
//               ]}
//               pathOptions={{ color: 'blue' }}
//             />
//           )}
//         </MapContainer>
//       )}
//     </div>
//   );
// }

// export default ParkingLotDetails;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
// import axiosInstance from '../axios'; // Import your Axios instance
// import userLocationIcon from '../images/user.png'; // Change this to your user location icon path
// import parkingLotIcon from '../images/parking.png'; // Change this to your parking lot icon path

// const containerStyle = {
//   width: '50%',
//   height: '500px',
// };

// const center = {
//   lat: 0, // Initial values, will be updated
//   lng: 0, // Initial values, will be updated
// };

// function ParkingLotDetails() {
//   const { parkingLotId } = useParams();
//   const [userLocation, setUserLocation] = useState(null);
//   const [parkingLotCoordinates, setParkingLotCoordinates] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     // Fetch user's location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//           center.lat = latitude;
//           center.lng = longitude;
//           // Fetch parking lot details and coordinates from backend
//           fetchParkingLotDetails(parkingLotId, { lat: latitude, lng: longitude });
//         },
//         error => {
//           console.error('Error getting current location:', error);
//         }
//       );
//     }
//   }, [parkingLotId]);

//   const fetchParkingLotDetails = async (id, location) => {
//     try {
//       const response = await axiosInstance.get(`parking-lots/${id}/`);
//       const parkingLot = response.data;
//       setParkingLotCoordinates({ lat: parkingLot.latitude, lng: parkingLot.longitude });
//       fetchDirections(location, { lat: parkingLot.latitude, lng: parkingLot.longitude });
//     } catch (error) {
//       console.error('Error fetching parking lot details:', error);
//     }
//   };

//   const fetchDirections = async (startLocation, destLocation) => {
//     try {
//       // Initialize the DirectionsService
//       const directionsService = new window.google.maps.DirectionsService();

//       // Create the request for directions
//       const request = {
//         origin: new window.google.maps.LatLng(startLocation.lat, startLocation.lng),
//         destination: new window.google.maps.LatLng(destLocation.lat, destLocation.lng),
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       };

//       // Fetch directions
//       directionsService.route(request, (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//         } else {
//           console.error('Error fetching directions:', status);
//         }
//       });
//     } catch (error) {
//       console.error('Error fetching directions:', error);
//     }
//   };

//   const handleShowDirections = () => {
//     // Open Google Maps with directions
//     if (userLocation && parkingLotCoordinates) {
//       window.open(`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${parkingLotCoordinates.lat},${parkingLotCoordinates.lng}`);
//     }
//   };

//   return (
//     <div>
//       <h1>Parking Lot Details</h1>
//       <GoogleMap

//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={15}
//         onLoad={mapInstance => setMap(mapInstance)}
//       >
//         {/* Display user marker */}
//         {userLocation && (
//           <Marker position={userLocation} icon={{ url: userLocationIcon, scaledSize: new window.google.maps.Size(32, 32) }} />
//         )}

//         {/* Display parking lot marker */}
//         {parkingLotCoordinates && (
//           <Marker position={parkingLotCoordinates} icon={{ url: parkingLotIcon, scaledSize: new window.google.maps.Size(32, 32) }} />
//         )}

//         {/* Display route */}
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//       <button onClick={handleShowDirections}>Show Directions</button>
//     </div>
//   );
// }

// export default ParkingLotDetails;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
// import axiosInstance from '../axios'; // Import your Axios instance
// import userLocationIcon from '../images/user.png'; // Change this to your user location icon path
// import parkingLotIcon from '../images/parking.png'; // Change this to your parking lot icon path

// const containerStyle = {
//   width: '50%',
//   height: '700px',
// };

// const center = {
//   lat: 0, // Initial values, will be updated
//   lng: 0, // Initial values, will be updated
// };

// function ParkingLotDetails() {
//   const { parkingLotId } = useParams();
//   const [userLocation, setUserLocation] = useState(null);
//   const [parkingLotCoordinates, setParkingLotCoordinates] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     // Fetch user's location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//           center.lat = latitude;
//           center.lng = longitude;
//           // Fetch parking lot details and coordinates from backend
//           fetchParkingLotDetails(parkingLotId, { lat: latitude, lng: longitude });
//         },
//         error => {
//           console.error('Error getting current location:', error);
//         }
//       );
//     }
//   }, [parkingLotId]);

//   const fetchParkingLotDetails = async (id, location) => {
//     try {
//       const response = await axiosInstance.get(`parking-lots/${id}/`);
//       const parkingLot = response.data;
//       setParkingLotCoordinates({ lat: parkingLot.latitude, lng: parkingLot.longitude });
//       fetchDirections(location, { lat: parkingLot.latitude, lng: parkingLot.longitude });
//     } catch (error) {
//       console.error('Error fetching parking lot details:', error);
//     }
//   };

//   const fetchDirections = async (startLocation, destLocation) => {
//     try {
//       // Initialize the DirectionsService
//       const directionsService = new window.google.maps.DirectionsService();

//       // Create the request for directions
//       const request = {
//         origin: new window.google.maps.LatLng(startLocation.lat, startLocation.lng),
//         destination: new window.google.maps.LatLng(destLocation.lat, destLocation.lng),
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       };

//       // Fetch directions
//       directionsService.route(request, (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//         } else {
//           console.error('Error fetching directions:', status);
//         }
//       });
//     } catch (error) {
//       console.error('Error fetching directions:', error);
//     }
//   };

//   const handleShowDirections = () => {
//     // Open Google Maps with directions
//     if (userLocation && parkingLotCoordinates) {
//       window.open(`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${parkingLotCoordinates.lat},${parkingLotCoordinates.lng}`);
//     }
//   };

//   return (
//     <div>
//       <h1>Parking Lot Details</h1>
//       {/* <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={15}
//         onLoad={mapInstance => setMap(mapInstance)}
//       >
//         Display user marker
//         {userLocation && (
//           <Marker position={userLocation} icon={{ url: userLocationIcon, scaledSize: new window.google.maps.Size(32, 32) }} />
//         )}

//         Display parking lot marker
//         {parkingLotCoordinates && (
//           <Marker position={parkingLotCoordinates} icon={{ url: parkingLotIcon, scaledSize: new window.google.maps.Size(32, 32) }} />
//         )}

//         Display route
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap> */}
//       {/* Embed Google Maps directions within an iframe */}
// <br/>
//       {directions && (
//         <iframe
//           src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAwlaOn54SWFxclJZ7dBJ9sNFutLYcOwxA&origin=${userLocation.lat},${userLocation.lng}&destination=${parkingLotCoordinates.lat},${parkingLotCoordinates.lng}`}
//           width="50%"
//           height="500"

//           style={{ border: 0 }}
//           allowFullScreen=""
//           aria-hidden="false"
//           tabIndex="0"
//         />
//       )}
//       <br/>

//       <button onClick={handleShowDirections}>Show Directions</button>

//     </div>
//   );
// }

// export default ParkingLotDetails;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import axiosInstance from "../axios"; // Import your Axios instance
import userLocationIcon from "../images/user.png"; // Change this to your user location icon path
import parkingLotIcon from "../images/parking.png"; // Change this to your parking lot icon path

const containerStyle = {
  width: "50%",
  height: "700px",
};

const center = {
  lat: 0, // Initial values, will be updated
  lng: 0, // Initial values, will be updated
};

function ParkingLotDetails() {
  const { parkingLotId } = useParams();
  const [userLocation, setUserLocation] = useState(null);
  const [parkingLotCoordinates, setParkingLotCoordinates] = useState(null);
  const [directions, setDirections] = useState(null);
  const [parkingLotDetails, setParkingLotDetails] = useState(null); // New state for parking lot details

  useEffect(() => {
    // Fetch user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          center.lat = latitude;
          center.lng = longitude;
          // Fetch parking lot details and coordinates from backend
          fetchParkingLotDetails(parkingLotId, {
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, [parkingLotId]);

  const fetchParkingLotDetails = async (id, location) => {
    try {
      const response = await axiosInstance.get(`parking-lots/${id}/`);
      const parkingLot = response.data;
      setParkingLotCoordinates({
        lat: parkingLot.latitude,
        lng: parkingLot.longitude,
      });
      setParkingLotDetails(parkingLot); // Set parking lot details in state
      fetchDirections(location, {
        lat: parkingLot.latitude,
        lng: parkingLot.longitude,
      });
    } catch (error) {
      console.error("Error fetching parking lot details:", error);
    }
  };

  const fetchDirections = async (startLocation, destLocation) => {
    try {
      // Initialize the DirectionsService
      const directionsService = new window.google.maps.DirectionsService();

      // Create the request for directions
      const request = {
        origin: new window.google.maps.LatLng(
          startLocation.lat,
          startLocation.lng
        ),
        destination: new window.google.maps.LatLng(
          destLocation.lat,
          destLocation.lng
        ),
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      // Fetch directions
      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      });
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  const handleShowDirections = () => {
    // Open Google Maps with directions
    if (userLocation && parkingLotCoordinates) {
      window.open(
        `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${parkingLotCoordinates.lat},${parkingLotCoordinates.lng}`
      );
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}>
        <div style={{ width: "50%" }}>
          <div
            style={{ padding: "2%", justifyContent: "center" }}
            className="heading_container">
            <h2>Nearby Parking Lots</h2>
          </div>
          {/* <h1>Parking Lot Details</h1> */}
          {parkingLotDetails && (
            <div>
              <h2 style={{ fontWeight: "bolder" }}>
                Parking Lot Name: {parkingLotDetails.name}
              </h2>
              <h4>
                <strong>Address: {parkingLotDetails.address}</strong>
              </h4>
              <h5>Description: {parkingLotDetails.description}</h5>
              {/* You can also display the parking lot image here */}
              {/* <img src={`https://res.cloudinary.com/djgayxkbm/${parkingLotDetails.image}`} alt="" /> */}
              <h5>
                <strong>
                  Available Slots: {parkingLotDetails.available_slots}
                </strong>
              </h5>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="text-center">
          {directions && (
            <iframe
              src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyAwlaOn54SWFxclJZ7dBJ9sNFutLYcOwxA&origin=${userLocation.lat},${userLocation.lng}&destination=${parkingLotCoordinates.lat},${parkingLotCoordinates.lng}`}
              width="75%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            />
          )}
        </div>
        <br />
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary active p-3 m-3 font-weight-bold"
          onClick={handleShowDirections}>
          Show Directions
        </button>
      </div>
    </div>
  );
}

export default ParkingLotDetails;
