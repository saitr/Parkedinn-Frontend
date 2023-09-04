import React from 'react'
import Home from './Components/Home'
import About from './Components/About'
import Services from './Components/Services'
import Features from './Components/Features'
import ContactPage from './Components/ContactPage'
import Register from './Components/Register'
import VerifyUser from './Components/VerifyUser'
import { Route, Routes } from "react-router-dom"
import Logout from './Components/Logout'
import LogIn from './Components/LogIn'
import Header from './Common/Header'
import Footer from './Common/Footer'
import Map from './Common/Map'
import ParkingLotDetails from './Common/ParkingLotDetails'
import AllParkingLots from './ParkingComponents/AllParkingLots'
import AllParkingSlot from './ParkingComponents/AllParkingSlots'
import ParkingSlotDetail from './ParkingComponents/ParkingSlotDetail'
import TotalBookings from './Components/TotalBookings'
import IndividualBookings from './Components/IndividualBookings'
import BillingCreate from './ParkingComponents/BillingCreate'
import AdminSignupForm from './Admin/AdminSignUp'
import StaffSignupForm from './Admin/StaffSignUp'
import ParkingSlotCreate from './ParkingComponents/ParkingSlotCreate'
// import { BookingProvider } from './ParkingComponents/BookingContext'

function Navigators() {
  return (
    <>
    <Header/>
    <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/about" element={<About/>}/>
        <Route path="/features" element={<Features/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/verify/:email" element={<VerifyUser />}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/map" element={<Map/>}/>
        <Route path="/parking-lot/:parkingLotId" element={<ParkingLotDetails />} />
        <Route path='/allparkinglots' element={<AllParkingLots/>}/>
        <Route path='/parking-slots-filter/:id' element={<AllParkingSlot/>}/>
        <Route path='/parkingslotdetail/:id' element={<ParkingSlotDetail/>}/>
        <Route path='/total_bookings' element={<TotalBookings/>}/>
        <Route path='/user_billing' element={<IndividualBookings/>}/>
        <Route path='/parking_rates' element={<BillingCreate/>}/>
        <Route path='/admin-signup' element={<AdminSignupForm/>}/>
        <Route path='/staff-signup' element={<StaffSignupForm/>}/>
        <Route path='/parking-slot-create' element={<ParkingSlotCreate/>}/>
    </Routes>
    <Footer/>
    </>
  )
}
export default Navigators

