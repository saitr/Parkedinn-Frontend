import React,{useEffect} from 'react'
import Background from "../Common/Background"
import Feature from "../Common/Feature"
import WhyChoose from "../Common/WhyChoose"
import Service from "../Common/Service"
import Client from "../Common/Client"
import Rate from "../Common/Rate"
import Contact from "../Common/Contact"

import AllLocations from '../Common/AllLocations'


function Home() {
  
  return (
    <>
    
    <div class="hero_area">
   
    <Background/>
    </div>
    

    <AllLocations/>

  <Feature/>
  <WhyChoose/>
  <Service/>
  <Client/>
  <Rate/>
  <Contact/>
  
  </>
  )
}

export default Home