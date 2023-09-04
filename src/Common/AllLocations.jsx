import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import ParkingIcon from "../images/parkingcorrect.png";
import UserIcon from "../images/usercorrect.png";
import jwt_decode from "jwt-decode";
import { makeStyles } from "@material-ui/core/styles";
import SuperCarGif from "../images/Spinner-2.gif";
import { Typography } from "@material-ui/core";
import haversine from "haversine-distance"; // Import the haversine library for distance calculation
// import {Link,useNavigate} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  factsContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    fontFamily: "Arial, sans-serif",
    fontSize: "40px",
    zIndex: 10000,
  },
}));

function NearbyParkingLotsMap() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyLots, setNearbyLots] = useState([]);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [distanceFromUser, setDistanceFromUser] = useState({});

  const [facts, setFacts] = useState([
    "The first automobile was built in 1885.",
    "The fastest car in the world is the Bugatti Chiron Super Sport 300+.",
    "The average car has around 30,000 parts.",
    "The world record for the longest jump by a car is 332 feet.",
    "The original Volkswagen Beetle is the most-manufactured car of a single platform.",
    "The Lamborghini company started by making tractors.",
    "The first speeding ticket was issued in 1902.",
    "The Porsche 911 has been in production since 1964.",
    "The Aston Martin logo is based on the wings of a bird.",
    "The first car radio was invented in 1929.",
  ]);
  const [randomFact, setRandomFact] = useState("");
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);
  }, [facts]);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    const decodedToken = jwt_decode(accessToken);
    const loggedInUserId = decodedToken.user_id;

    axiosInstance.get("user_list/").then((response) => {
      const loggedInUser = response.data.find(
        (user) => user.id === loggedInUserId
      );
      setIsSuperUser(loggedInUser && loggedInUser.is_superuser);
      setIsStaff(loggedInUser && loggedInUser.is_staff);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          fetchNearbyParkingLots(latitude, longitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, [navigate]);

  const fetchNearbyParkingLots = async (latitude, longitude) => {
    try {
      const response = await axiosInstance.get(
        `/nearest_parking_lots/?latitude=${latitude}&longitude=${longitude}&radius=3`
      );
      setNearbyLots(response.data);
      const distances = {};
      response.data.forEach((parkingLot) => {
        const distance = haversine(
          { lat: latitude, lon: longitude },
          { lat: parkingLot.latitude, lon: parkingLot.longitude }
        );
        distances[parkingLot.id] = (distance / 1000).toFixed(2); // Convert to kilometers and round to 2 decimal places
      });
      setDistanceFromUser(distances);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching nearby parking lots:", error);
    }
  };

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

  return (
    <div>
      <div
            className="heading_container"
            style={{ padding: '2%', justifyContent: 'center' }}
          >
            <h2>All Parking Slots</h2>
          </div>
      {(isSuperUser || isStaff) && (
        <div className="text-center m-2 mb-5">
          <>
            <Link to="/map">
              <button className="map-creation m-3">Create Parking Lot</button>
            </Link>
            <Link to="/allparkinglots">
              <button className="map-creation m-3">All Parking Lots</button>
            </Link>
          </>
        </div>
      )}

      {loading ? (
        <>
          <div className={classes.loadingOverlay}>
            <div className={classes.factsContainer}>
              <img src={SuperCarGif} alt="Loading" />
              <Typography variant="h6">{randomFact}</Typography>
            </div>
          </div>
        </>
      ) : (
        userLocation && (
          <>
            <h6 className="text-dark text-center" id="nearby-locations">
              <strong>Note:</strong> These are the locations within a 3 km radius.
            </h6>
            <MapContainer
              center={userLocation}
              zoom={14}
              style={{
                height: "700px",
                width: "100%",
                marginBottom: "3%",
                border: "2px solid black",
                borderRadius: "3px",
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={userLocation} icon={customuserIcon}>
                <Popup>
                  <div>
                    <h3>Your Location</h3>
                  </div>
                </Popup>
              </Marker>

              <Circle
                center={userLocation}
                radius={3000}
                pathOptions={{ color: "red" }}
              />

              {nearbyLots.map((parkingLot) => (
                <Link key={parkingLot.id} to={`parking-lot/${parkingLot.id}`}>
                  <Marker
                    position={[parkingLot.latitude, parkingLot.longitude]}
                    icon={customIcon}
                  >
                    <Popup>
                      <div>
                        <h3>{parkingLot.name}</h3>
                        <p>{parkingLot.address}</p>
                        <h6>Distance: {distanceFromUser[parkingLot.id]} Km</h6>
                      </div>
                    </Popup>
                  </Marker>
                </Link>
              ))}
            </MapContainer>
          </>
        )
      )}
    </div>
  );
}

export default NearbyParkingLotsMap;
