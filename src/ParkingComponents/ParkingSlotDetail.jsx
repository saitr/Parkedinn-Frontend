// import React, { useState } from "react";
// import Stopwatch from "./Stopwatch"; // Assuming you have a Stopwatch component
// import axiosInstance from "../axios";
// import { Link } from "react-router-dom";

// function ParkingSlotDetail() {
//     const [username, setUsername] = useState("");
//     const [vehicleNumber, setVehicleNumber] = useState("");
//     const [bookingId, setBookingId] = useState(null);
//     const [userSuggestions, setUserSuggestions] = useState([]);
//     const [timerRunning, setTimerRunning] = useState(false);
//     const [selectedParkingSlot, setSelectedParkingSlot] = useState(null); // To store the selected parking slot ID
  
//     const handleUsernameChange = async (event) => {
//       const enteredUsername = event.target.value;
//       setUsername(enteredUsername);
  
//       try {
//         const response = await axiosInstance.get("user_list/");
//         const allUsers = response.data.map((user) => user.username);
//         const filteredSuggestions = allUsers.filter((user) =>
//           user.toLowerCase().includes(enteredUsername.toLowerCase())
//         );
//         setUserSuggestions(filteredSuggestions);
//       } catch (error) {
//         console.error("Error fetching user suggestions:", error);
//       }
//     };
  
//     const handleSuggestionClick = (suggestion) => {
//       setUsername(suggestion);
//       setUserSuggestions([]);
//     };
  
//     const handleVehicleNumberChange = (event) => {
//       setVehicleNumber(event.target.value);
//     };
  
//     const handleStartTimer = async () => {
//       try {
//         const response = await axiosInstance.post("start-timer/", {
//           username: username,
//           vehicle_number: vehicleNumber,
//           parking_slot: selectedParkingSlot, // Use the selected parking slot ID
//         });
//         setBookingId(response.data.id);
//         setTimerRunning(true);
//       } catch (error) {
//         console.error("Error starting timer:", error);
//       }
//     };
  
//     const handleStopTimer = async () => {
//       try {
//         await axiosInstance.post(`stop-timer/${bookingId}/`);
//         setTimerRunning(false);
//       } catch (error) {
//         console.error("Error stopping timer:", error);
//       }
//     };

//   return (
//     <div className="container">
//       <div className="heading_container" style={{ padding: "2%", justifyContent: 'center' }}>
//         <h2>Parking Slot Details</h2>
//       </div>
//       <div className="text-center">
//         <Link to='/register'>
//           <button className="map-creation">Create User</button>
//         </Link>
//       </div>
//       <div className="card m-4">
//         <div className="card-body">
//           <h5 className="card-title">User Information</h5>
//           <div className="form-group">
//             <label className="label">Username:</label>
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 value={username}
//                 onChange={handleUsernameChange}
//               />
//             </div>
//             {userSuggestions.length > 0 && username && (
//               <div className="suggestions-dropdown">
//                 {userSuggestions.map((suggestion, index) => (
//                   <div
//                     key={index}
//                     className="suggestion"
//                     onClick={() => handleSuggestionClick(suggestion)}
//                   >
//                     {suggestion}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="form-group">
//             <label>Vehicle Number:</label>
//             <input
//               type="text"
//               className="form-control"
//               value={vehicleNumber}
//               onChange={handleVehicleNumberChange}
//             />
//           </div>
//           {!timerRunning ? (
//             <button className="btn btn-primary" onClick={handleStartTimer}>
//               Start Timer
//             </button>
//           ) : (
//             <button className="btn btn-danger" onClick={handleStopTimer}>
//               Stop Timer
//             </button>
//           )}
//         </div>
//       </div>
//       {bookingId && <Stopwatch bookingId={bookingId} />}
//     </div>
//   );
// }

// export default ParkingSlotDetail;


// import React, { useState,useEffect } from "react";
// import Stopwatch from "./Stopwatch"; // Assuming you have a Stopwatch component
// import axiosInstance from "../axios";
// import { Link, useParams } from "react-router-dom";

// function ParkingSlotDetail() {
//   const { id } = useParams();
//   const [username, setUsername] = useState("");
//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [bookingId, setBookingId] = useState(null);
//   const [userSuggestions, setUserSuggestions] = useState([]);
//   const [timerRunning, setTimerRunning] = useState(false);
//   const [selectedParkingSlot, setSelectedParkingSlot] = useState(id); // Initialize with the slot ID from the URL
//   const [selectedUserId, setSelectedUserId] = useState(null); // To store the selected user ID

//   useEffect(() => {
//     localStorage.setItem('username', username);
//   }, [username]);

//   const handleUsernameChange = async (event) => {
//     const enteredUsername = event.target.value;
//     setUsername(enteredUsername);

//     try {
//       const response = await axiosInstance.get("user_list/");
//       const allUsers = response.data;
//       const filteredSuggestions = allUsers.filter((user) =>
//         user.username.toLowerCase().includes(enteredUsername.toLowerCase())
//       );
//       setUserSuggestions(filteredSuggestions);
//     } catch (error) {
//       console.error("Error fetching user suggestions:", error);
//     }
//   };

//   const handleSuggestionClick = (selectedUser) => {
//     setUsername(selectedUser.username);
//     setSelectedUserId(selectedUser.id); // Save the selected user's ID
//     setUserSuggestions([]);
//   };

//   const handleVehicleNumberChange = (event) => {
//     setVehicleNumber(event.target.value);
//   };

//   const handleStartTimer = async () => {
//     try {
//       const response = await axiosInstance.post("start-timer/", {
//         user: selectedUserId, // Use the selected user's ID
//         vehicle_number: vehicleNumber,
//         parking_slot: selectedParkingSlot, // Use the selected parking slot ID
//       });
//       setBookingId(response.data.id);
//       setTimerRunning(true);
//     } catch (error) {
//       console.error("Error starting timer:", error);
//     }
//   };

//   const handleStopTimer = async () => {
//     try {
//       await axiosInstance.put(`stop-timer/${bookingId}/`);
//       setTimerRunning(false);
//     } catch (error) {
//       console.error("Error stopping timer:", error);
//     }
//   };

//     return (
//       <div className="container">
//         <div className="heading_container" style={{ padding: "2%", justifyContent: 'center' }}>
//           <h2>Parking Slot Details</h2>
//         </div>
//         <div className="text-center">
//           <Link to='/register'>
//             <button className="map-creation">Create User</button>
//           </Link>
//         </div>
//         <div className="card m-4">
//           <div className="card-body">
//             <h5 className="card-title">User Information</h5>
//             <div className="form-group">
//               <label className="label">Username:</label>
//               <div className="input-group">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={username}
//                   onChange={handleUsernameChange}
//                 />
//               </div>
//               {userSuggestions.length > 0 && username && (
//                 <div className="suggestions-dropdown">
//                   {userSuggestions.map((user, index) => (
//                     <div
//                       key={index}
//                       className="suggestion"
//                       onClick={() => handleSuggestionClick(user)}
//                     >
//                       {user.username}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="form-group">
//               <label>Vehicle Number:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={vehicleNumber}
//                 onChange={handleVehicleNumberChange}
//               />
//             </div>
//             {!timerRunning ? (
//               <button className="btn btn-primary" onClick={handleStartTimer}>
//                 Start Timer
//               </button>
//             ) : (
//               <button className="btn btn-danger" onClick={handleStopTimer}>
//                 Stop Timer
//               </button>
//             )}
//           </div>
//         </div>
//         {/* {bookingId && <Stopwatch bookingId={bookingId} />} */}
//       </div>
//     );
// }

// export default ParkingSlotDetail;


import React, { useState, useEffect } from "react";
import Stopwatch from "./Stopwatch"; // Assuming you have a Stopwatch component
import axiosInstance from "../axios";
import { Link, useParams } from "react-router-dom";

function ParkingSlotDetail() {
  const { id } = useParams();
  const [username, setUsername] = useState(localStorage.getItem('username') || "");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [timerRunning, setTimerRunning] = useState(localStorage.getItem('timerRunning') === 'true' || false);
  const [selectedParkingSlot, setSelectedParkingSlot] = useState(id); // Initialize with the slot ID from the URL
  const [selectedUserId, setSelectedUserId] = useState(null); // To store the selected user ID

 

  const handleUsernameChange = async (event) => {
    const enteredUsername = event.target.value;
    setUsername(enteredUsername);

    try {
      const response = await axiosInstance.get("user_list/");
      const allUsers = response.data;
      const filteredSuggestions = allUsers.filter((user) =>
        user.username.toLowerCase().includes(enteredUsername.toLowerCase())
      );
      setUserSuggestions(filteredSuggestions);
    } catch (error) {
      console.error("Error fetching user suggestions:", error);
    }
  };

  // useEffect(() => {
  //   async function fetchParkingSlotData() {
  //     try {
  //       // Make API request to fetch parking slot data from the backend
  //       const response = await axiosInstance.get(`parking-slot/${id}/billing/`);
  //       const slotData = response.data;
  //       console.log('This is the parking slot data',slotData);
  //       // Update state based on the fetched slot data
  //       if (slotData.end_time === null) {
  //         setUsername(slotData.user.username);
  //         setSelectedUserId(slotData.user.id);
  //         setVehicleNumber(slotData.vehicle_number);
  //         setTimerRunning(true);
  //         setBookingId(slotData.id);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching parking slot data:", error);
  //     }
  //   }

  //   fetchParkingSlotData();
  // }, [id]);

  useEffect(() => {
    async function fetchParkingSlotData() {
      try {
        const response = await axiosInstance.get(`parking-slot/${id}/billing/`);
        const billingData = response.data;
        console.log('This is the parking slot data', billingData);
  
        if (billingData.end_time === null) {
          setUsername(billingData.user.username);
          setSelectedUserId(billingData.user.id);
          setVehicleNumber(billingData.vehicle_number);
          setTimerRunning(true);
          setBookingId(billingData.id);
        }
      } catch (error) {
        console.error("Error fetching parking slot data:", error);
      }
    }
  
    fetchParkingSlotData();
  }, [id]);

  const handleSuggestionClick = (selectedUser) => {
    setUsername(selectedUser.username);
    setSelectedUserId(selectedUser.id); // Save the selected user's ID
    setUserSuggestions([]);
  };

  const handleVehicleNumberChange = (event) => {
    setVehicleNumber(event.target.value);
  };

  const handleStartTimer = async () => {
    try {
      const response = await axiosInstance.post("start-timer/", {
        user: selectedUserId, // Use the selected user's ID
        vehicle_number: vehicleNumber,
        parking_slot: selectedParkingSlot, // Use the selected parking slot ID
      });
      setBookingId(response.data.id);
      setTimerRunning(true);
    } catch (error) {
      console.error("Error starting timer:", error);
    }
  };

  // const handleStopTimer = async () => {
  //   try {
  //     await axiosInstance.put(`stop-timer/${bookingId}/`);
  //     setTimerRunning(false);
  //   } catch (error) {
  //     console.error("Error stopping timer:", error);
  //   }
  // };
  const handleStopTimer = async () => {
    try {
      await axiosInstance.put(`stop-timer/${bookingId}/`);
      setTimerRunning(false);
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error stopping timer:", error);
    }
  };

  return (
    <div className="container">
      <div className="heading_container" style={{ padding: "2%", justifyContent: 'center' }}>
        <h2>Parking Slot Details</h2>
      </div>
      <div className="text-center">
        <Link to='/register'>
          <button className="map-creation">Create User</button>
        </Link>
      </div>
      <div className="card m-4">
        <div className="card-body">
          <h5 className="card-title">User Information</h5>
          <div className="form-group">
            <label className="label">Username:</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            {userSuggestions.length > 0 && username && (
              <div className="suggestions-dropdown">
                {userSuggestions.map((user, index) => (
                  <div
                    key={index}
                    className="suggestion"
                    onClick={() => handleSuggestionClick(user)}
                  >
                    {user.username}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Vehicle Number:</label>
            <input
              type="text"
              className="form-control"
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
            />
          </div>
          {!timerRunning ? (
            <button className="btn btn-primary" onClick={handleStartTimer}>
              Start Timer
            </button>
          ) : (
            <button className="btn btn-danger" onClick={handleStopTimer}>
              Stop Timer
            </button>
          )}
        </div>
      </div>
      {/* {bookingId && <Stopwatch bookingId={bookingId} />} */}
    </div>
  );
}

export default ParkingSlotDetail;
