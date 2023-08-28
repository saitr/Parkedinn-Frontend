import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../axios";
import Sadgif from "../images/sad.gif";

function ParkingSlotComponent() {
  const { id } = useParams();
  const [parkingSlots, setParkingSlots] = useState([]);

  useEffect(() => {
    axiosInstance.get(`parking-slots-filter/${id}/`).then((response) => {
      setParkingSlots(response.data);
    });
  }, [id]);

  console.log("ParkingSlots", parkingSlots);

  return (
    <>
      <div
        className="heading_container"
        style={{ padding: "2%", justifyContent: "center" }}>
        <h2>Parking Slots</h2>
      </div>
      <div className="parking-slots-grid m-5">
        {parkingSlots.length > 0 ? (
          parkingSlots.map((slot) => (
            <Link
              to={`/parkingslotdetail/${slot.id}`} // Replace with the correct URL path
              key={slot.id}
              className={`slot-link ${slot.is_available ? "" : "unavailable"}`}>
              <div className="slot">
                <h4>Slot {slot.slot_number}</h4>
                {/* Render other slot information as needed */}
              </div>
            </Link>
          ))
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
      </div>
    </>
  );
}

export default ParkingSlotComponent;
