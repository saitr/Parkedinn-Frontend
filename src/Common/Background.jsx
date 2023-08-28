import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

function Background() {
  return (
    <section class=" slider_section ">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active">01</li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1">02</li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="container">
              <div class="detail-box">
                <h1>

                  The Best <br/>
                  Deals For Parking lots
                </h1>
                <p>
                Elevate Your Parking Experience: Where Convenience Meets Security.
                </p>
                <div>
                  <a href="#nearby-locations">
                    Check Out Locations
                  </a>
                  {/* <Link to="/contact">
                    Contact us
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="container">
              <div class="detail-box">
                <h1>

                  The Best <br/>
                  Deals For Parking lots
                </h1>
                <p>
                Beyond Parking: Where Every Space Holds a Seamless Story.
                </p>
                <div>
                  <a href="#nearby-locations">
                    Check Out Locations
                  </a>
                  {/* <Link to="/contact">
                    Contact us
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="sr-only">Next</span>
        </a>
      </div>

    </section>
  )
}

export default Background