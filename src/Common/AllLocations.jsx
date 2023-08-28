// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../axios';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet'; // Import Leaflet
// import ParkingIcon from '../images/parkingcorrect.png'

// import {
//     Link,
//   } from "react-router-dom";
// function NearbyParkingLotsMap() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearbyLots, setNearbyLots] = useState([]);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation([latitude, longitude]);
//           fetchNearbyParkingLots(latitude, longitude);
//         },
//         error => {
//           console.error('Error getting current location:', error);
//         }
//       );
//     }
//   }, []);

//   const fetchNearbyParkingLots = async (latitude, longitude) => {
//     try {
//       const response = await axiosInstance.get(
//         `/nearest_parking_lots/?latitude=${latitude}&longitude=${longitude}&radius=10`
//       );
//       setNearbyLots(response.data);
//     } catch (error) {
//       console.error('Error fetching nearby parking lots:', error);
//     }
//   };

//   // Define a custom icon for the markers
//   const customIcon = new L.Icon({
//     iconUrl: ParkingIcon, // Replace with the path to your custom icon image
//     iconSize: [40, 40], // Adjust the size as needed
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32],
//   });

//   return (
//     <div>
//       <h1>Nearby Parking Lots Map</h1>
//       {userLocation && (
//         <MapContainer center={userLocation} zoom={15} style={{ height: '500px', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           {nearbyLots.map(parkingLot => (
//             <Link key={parkingLot.id} to={`parking-lot/${parkingLot.id}`}>
//               <Marker
//                 position={[parkingLot.latitude, parkingLot.longitude]}
//                 icon={customIcon}
//               >
//                 <Popup>
//                   <div>
//                     <h3>{parkingLot.name}</h3>
//                     <p>{parkingLot.address}</p>
//                   </div>
//                 </Popup>
//               </Marker>
//             </Link>
//           ))}
//         </MapContainer>
//       )}
//     </div>
//   );
// }

// export default NearbyParkingLotsMap;


import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet
import ParkingIcon from '../images/parkingcorrect.png';
import UserIcon from '../images/usercorrect.png';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // Import the JWT decode library


function NearbyParkingLotsMap() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyLots, setNearbyLots] = useState([]);
  const [isSuperUser, setIsSuperUser] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/login');
      return;
    }

    // Decode the JWT token to get the user ID
    const decodedToken = jwt_decode(accessToken);
    const loggedInUserId = decodedToken.user_id;
    console.log('logged in ',loggedInUserId)
    // Fetch user list
    axiosInstance.get('user_list/').then(response => {
      const loggedInUser = response.data.find(user => user.id === loggedInUserId);
      setIsSuperUser(loggedInUser && loggedInUser.is_superuser);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          fetchNearbyParkingLots(latitude, longitude);
        },
        error => {
          console.error('Error getting current location:', error);
        }
      );
    }
  }, [navigate]);

  const fetchNearbyParkingLots = async (latitude, longitude) => {
    try {
      const response = await axiosInstance.get(
        `/nearest_parking_lots/?latitude=${latitude}&longitude=${longitude}&radius=10`
      );
      setNearbyLots(response.data);
    } catch (error) {
      console.error('Error fetching nearby parking lots:', error);
    }
  };

  // Define a custom icon for the markers
  const customIcon = new L.Icon({
    iconUrl: ParkingIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const customuserIcon = new L.Icon({
    iconUrl: UserIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  console.log('This is the superuser',isSuperUser)
  return (
    <div>
      <div style={{ padding: '2%', justifyContent: 'center' }} className="heading_container">
        <h2>Nearby Parking Lots</h2>
      </div>
      {isSuperUser && (
      <div className="text-center m-2 mb-5">
          <>
           <Link to='/map'>
           <button className="map-creation m-3">Create Parking Lot</button>
          </Link> 
          <Link to="/allparkinglots">
          <button className="map-creation m-3">All Parking Lots</button>
          </Link>
          </>
      </div>
      )}
      {userLocation && (
        <>
          <h6 className="text-dark text-center" id='nearby-locations'> <strong>Note:</strong> These are the locations within 10Km in radius.</h6>
        <MapContainer center={userLocation} zoom={15} style={{ height: '500px', width: '100%',marginBottom:'3%',border:'2px solid black',borderRadius:'3px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* Show user's current position */}
          <Marker position={userLocation} icon={customuserIcon}>
            <Popup>
              <div>
                <h3>Your Location</h3>
              </div>
            </Popup>
          </Marker>

          {nearbyLots.map(parkingLot => (
            <Link key={parkingLot.id} to={`parking-lot/${parkingLot.id}`}>
              <Marker position={[parkingLot.latitude, parkingLot.longitude]} icon={customIcon}>
                <Popup>
                  <div>
                    <h3>{parkingLot.name}</h3>
                    <p>{parkingLot.address}</p>
                  </div>
                </Popup>
              </Marker>
            </Link>
          ))}
        </MapContainer>
        </>
      )}
      
    </div>
  );
}

export default NearbyParkingLotsMap;
