import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../axios";
import Sadgif from "../images/sad.gif";
import ParkingLotDetails from "../Common/ParkingLotDetails";
import TwoWheeler from '../images/2wheeler-bg.png'
import FourWheeler from '../images/4wheeler-bg.png'
import HeavyVehicles from '../images/heavy_vehicles-bg.png'

function ParkingSlotComponent() {
  const { id } = useParams();
  const [parkingSlots, setParkingSlots] = useState([]);
  const [parkingLotDetails, setParkingLotDetails] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState(""); // State to store selected vehicle type

  useEffect(() => {
    axiosInstance.get(`parking-slots-filter/${id}/`).then((response) => {
      setParkingSlots(response.data);
    });
  }, [id]);

  useEffect(() => {
    axiosInstance.get(`parking-lots/${id}/`).then((response) => {
      setParkingLotDetails(response.data);
    });
  }, []);

  const handleVehicleTypeClick = (vehicleType) => {
    setSelectedVehicleType(vehicleType); // Update selected vehicle type when the button is clicked
  };

  // Filter parking slots based on the selected vehicle type
  const filteredParkingSlots = selectedVehicleType
    ? parkingSlots.filter((slot) => slot.parking_slot_type === selectedVehicleType)
    : [];

  // Group parking slots by parking_slot_type
  const groupedSlots = filteredParkingSlots.reduce((result, slot) => {
    if (!result[slot.parking_slot_type]) {
      result[slot.parking_slot_type] = [];
    }
    result[slot.parking_slot_type].push(slot);
    return result;
  }, {});

  return (
    <>
      <div className="heading_container" style={{ padding: "2%", justifyContent: "center" }}>
        <h2>Parking Lot Details</h2>
      </div>
      <div className="text-center">
        {parkingLotDetails && (
          <div>
            <h2 style={{ fontWeight: "bolder" }}>
              Parking Lot Name: {parkingLotDetails.name}
            </h2>
            <h4>
              <strong>Address: {parkingLotDetails.address}</strong>
            </h4>
            <h5>Description: {parkingLotDetails.description}</h5>
            <h5>
              <strong>
                Available Slots: {parkingLotDetails.available_slots}
              </strong>
            </h5>
            <h5>
              <strong>
                Parking Lot Type: {parkingLotDetails.parking_type}
              </strong>
            </h5>
          </div>
        )}
      </div>
      <div className="heading_container" style={{ padding: "2%", justifyContent: "center" }}>
        <h2>Parking Slots Available</h2>
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        <div className="card m-3" style={{ width: "18rem" }}>
          <img className="card-img-top" src={TwoWheeler} alt="Card image cap" style={{ height: '200px' }} />
          <div className="card-body">
            <h5 className="card-title font-weight-bold text-center m-2">Two Wheeler</h5>
            <div className="text-center">
              <button className="btn btn-primary" onClick={() => handleVehicleTypeClick("Two Wheeler")}>Show Parking Slots</button>
            </div>
          </div>
        </div>

        <div className="card m-3" style={{ width: "18rem" }}>
          <img className="card-img-top" src={FourWheeler} alt="Card image cap" style={{ height: '200px' }} />
          <div className="card-body">
            <h5 className="card-title font-weight-bold text-center m-2">Four Wheeler</h5>
            <div className="text-center">
              <button className="btn btn-primary" onClick={() => handleVehicleTypeClick("Four Wheeler")}>Show Parking Slots</button>
            </div>
          </div>
        </div>

        <div className="card m-3" style={{ width: "18rem" }}>
          <img className="card-img-top" src={HeavyVehicles} alt="Card image cap" style={{ height: '200px' }} />
          <div className="card-body">
            <h5 className="card-title font-weight-bold text-center m-2">Heavy Vehicle</h5>
            <div className="text-center">
              <button className="btn btn-primary" onClick={() => handleVehicleTypeClick("Heavy Vehicle")}>Show Parking Slots</button>
            </div>
          </div>
        </div>
      </div>

      {selectedVehicleType && groupedSlots[selectedVehicleType] && groupedSlots[selectedVehicleType].length > 0 ? (
        <>
          <h3 className="text-center text-decoration-underline" style={{ textDecoration: "underline" }}>
            {selectedVehicleType}
          </h3>
          <div className="parking-slots-grid m-5">
            {groupedSlots[selectedVehicleType].map((slot) => (
              <Link
                to={`/parkingslotdetail/${slot.id}`}
                key={slot.id}
                className={`slot-link ${slot.is_available ? "" : "unavailable"}`}>
                <div className="slot">
                  <h4>Slot {slot.slot_number}</h4>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="d-block">
          <h1 className="display-3 text-center text-dark">
            No parking slots available.
            <span>
              <img src={Sadgif} alt="" style={{ width: "10%" }} />
              <img src={Sadgif} alt="" style={{ width: "10%" }} />
              <img src={Sadgif} alt="" style={{ width: "10%" }} />
            </span>
          </h1>
        </div>
      )}

      
    </>
  );
}

export default ParkingSlotComponent;
