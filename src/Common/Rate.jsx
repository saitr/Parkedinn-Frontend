import React from 'react'

function Rate() {
  return (
    
  <section class="rate_section layout_padding">
  <div class="container">
    <div class="heading_container">
      <h2>
        Parking Options and Rates
      </h2>
    </div>
    <div class="rate_container">
    <div class="box">
        <div class="detail-box">
          <div class="price">
            <h3>
            &#x20B9;<span>0.67</span>/min
            </h3>
            <h6>
              Basic
            </h6>
          </div>
          <p>
          With our per-minute pricing, you pay only for the time you actually use. This flexibility ensures that you don't have to worry about overpaying for parking time you don't need. It's a fair and customer-centric approach that puts you in control.
          </p>
        </div>
        {/* <div class="btn-box">
          <a href="">
            Read More
          </a>
        </div> */}
      </div>
      <div class="box">
        <div class="detail-box">
          <div class="price">
            <h3>
            &#x20B9;<span>965</span>/day
            </h3>
            <h6>
              Basic
            </h6>
          </div>
          <p>
          Our daily parking rate of ₹965 reflects our commitment to offering exceptional value without compromising on quality. We believe in providing a parking solution that is both cost-effective and feature-rich, ensuring that you receive more than just a parking spot.
          </p>
        </div>
        {/* <div class="btn-box">
          <a href="">
            Read More
          </a>
        </div> */}
      </div>
      <div class="box">
        <div class="detail-box">
          <div class="price">
            <h3>
            &#x20B9;<span>6753</span>/week

            </h3>
            <h6>
              Standard
            </h6>
          </div>
          <p>
          Choosing our weekly option means you can enjoy extended periods of stress-free parking. With 24/7 security measures, attentive staff, and a focus on maintaining your vehicle's safety, you can confidently leave your vehicle with us for an entire week.
          </p>
        </div>
        {/* <div class="btn-box">
          <a href="">
            Read More
          </a>
        </div> */}
      </div>
      
    </div>
  </div>
</section>
  )
}

export default Rate