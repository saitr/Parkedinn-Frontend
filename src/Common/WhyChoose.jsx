import React from 'react'
import W1 from '../images/w-1.jpg'
import W2 from '../images/w-2.jpg'
import W3 from '../images/w-3.jpg'
import W4 from '../images/w-4.jpg'
import Link from '../images/link.png'










function WhyChoose() {
  return (
    <section class="why_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="detail-box">
            <div class="heading_container">
              <h2>
                Why Choose Us
              </h2>
            </div>

            <p>
            When it comes to parking solutions, we stand out as the unparalleled choice. With a wealth of experience in the industry, we have honed our expertise to perfection, ensuring that every aspect of your parking experience is meticulously catered to. We're not just about parking; we're about revolutionizing the way you perceive it.

Our commitment to cutting-edge technology sets us apart. We employ the latest innovations in parking management systems to ensure a seamless and convenient experience for every user. From streamlined booking processes to real-time tracking, we leverage technology to make your parking journey hassle-free.
            </p>
            <div>
              <a href="">
                Read More
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="img-container">
            <div class="row">
              <div class="col-sm-6">
                <div class="img-box">
                  <img src={W1} alt=""/>
                  <a href="">
                  <img src={Link} alt=""/>

                  </a>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="img-box">
                  <img src={W2} alt=""/>
                  <a href="">
                  <img src={Link} alt=""/>

                  </a>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="img-box">
                  <img src={W3} alt=""/>
                  <a href="">
                  <img src={Link} alt=""/>

                  </a>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="img-box">
                  <img src={W4} alt=""/>
                  <a href="">
                    <img src={Link} alt=""/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default WhyChoose