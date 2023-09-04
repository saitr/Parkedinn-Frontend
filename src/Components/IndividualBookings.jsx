import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios'


function IndividualBookings() {
    const [individualBookings,setIndividualBookings] = useState([])
    useEffect(()=>{
        axiosInstance.get('user_billing/').then((response)=>{
            setIndividualBookings(response.data);
        })
    },[])
    console.log('individual booking',individualBookings)
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
            <th scope="col">Slot Number</th>
            <th scope="col">Vehicle Number</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {individualBookings.map((book) => (
            <tr key={book.id}>
              <td>{book.user.username}</td>
              <td>{book.parking_slot.parking_lot.name}</td>
              <td>{book.parking_slot.slot_number}</td>
              <td>{book.vehicle_number}</td>
              <td>{formatDateTime(book.start_time)}</td>
              <td>{formatDateTime(book.end_time)}</td>
              <td>&#8377;{book.total_cost}</td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  )
}

export default IndividualBookings