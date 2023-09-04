import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import "../css/search.css";
import Sadgif from "../images/sad.gif";
import { Link } from "react-router-dom";
function AllParkingLots() {
  const [parkinglots, setParkinglot] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredParkingLots, setFilteredParkingLots] = useState([]);

  useEffect(() => {
    axiosInstance.get("parking_lot_list").then((response) => {
      setParkinglot(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredLots = parkinglots.filter((parkingLot) =>
      parkingLot.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredParkingLots(filteredLots);
  }, [searchInput, parkinglots]);

  return (
    <>
      <div className="m-4 d-flex">
        <form className="search-form">
          {/* <label htmlFor="search">Search</label> */}
          <input
            id="search"
            type="search"
            pattern=".*\S.*"
            required
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <span className="caret"></span>
        </form>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {filteredParkingLots.length === 0 ? (
          <>
            <h1 className="display-3 m-3 text-center">
              No Parking Lots Found.{" "}
              <span>
                <img src={Sadgif} alt="" style={{ width: "10%" }} />
                <img src={Sadgif} alt="" style={{ width: "10%" }} />
                <img src={Sadgif} alt="" style={{ width: "10%" }} />
              </span>
            </h1>
          </>
        ) : (
          filteredParkingLots.map((parkingLot) => (
            <div
              className="card m-3"
              style={{ width: "18rem" }}
              key={parkingLot.id}>
              <img
                src={`https://res.cloudinary.com/djgayxkbm/${parkingLot.image}`}
                className="card-img-top"
                style={{ height: "290px" }}
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  <strong>{parkingLot.name}</strong>
                </h5>
                <p className="card-text">{parkingLot.address}</p>
                <h5>
                  <strong>Available Slots: {parkingLot.available_slots}</strong>
                </h5>
                <div className="d-flex justify-content-center align-items-center">
                <Link to={`/parking-slots-filter/${parkingLot.id}`}>
                  <button
                    className="map-creation p-2"
                    style={{ cursor: "pointer" }}>
                    Book Slots
                  </button>
                </Link>
                <Link to="/parking-slot-create">
                  <button className="map-creation p-2 m-2">Create Slot</button>
                </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="text-center d-flex justify-content-center">
        <Link to="/map">
          <button className="map-creation m-3 p-3">Create Parking Lot</button>
        </Link>
        <Link to="/parking_rates">
        <div className="text-center">
          <button className="map-creation m-3 p-3">Create Parking Fare</button>
        </div>
      </Link>
      </div>
    </>
  );
}

export default AllParkingLots;
