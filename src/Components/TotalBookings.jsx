import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

function TotalBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosInstance.get('total_bookings/').then((response) => {
      setBookings(response.data);
    }).catch(
      // alert('You are not admin to perform this action')
      console.log('You are not admin to perform this action')
    );
  }, []);
  console.log('state', bookings);
  const formatDateTime = (datetime) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(datetime).toLocaleString(undefined, options);
  };
  return (
    <div>
      <table className="table table-hover text-center mt-5 mb-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Parking Lot</th>
            <th scope="col">Parking Slot</th>
            <th scope="col">ParkingLot Owner</th>
            <th scope="col">Vehicle Number</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            {/* <th scope="col">Parking Time</th> */}
            <th scope="col">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((book) => (
            <tr key={book.id}>
              <td>{book.user.username}</td>
              <td>{book.parking_slot.parking_lot.name}</td>
              <td>{book.parking_slot.slot_number}</td>
              <td style={{textTransform:'uppercase'}}>{book.user.username}</td>
              <td>{book.vehicle_number}</td>
              <td>{formatDateTime(book.start_time)}</td>
              <td>{formatDateTime(book.end_time)}</td>
              {/* <td>{formatDateTime(book.elapsed_time)}</td> */}
              <td>&#8377;{book.total_cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TotalBookings;
