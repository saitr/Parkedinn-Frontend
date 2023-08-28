import React from 'react'
import Money from '../images/money.png'
import Man from '../images/man.png'
import Clock from '../images/clock.png'

function Feature() {
  return (
    <section class="feature_section layout_padding2 ">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="box">
            <div class="img-box">
              <img src={Money} alt=""/>
            </div>
            <div class="detail-box">
              <h5>
                Save Money
              </h5>
              <p>
                It is a long established fact that a reader will be distracted by the readable content
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="box">
            <div class="img-box">
              <img src={Clock} alt=""/>
            </div>
            <div class="detail-box">
              <h5>
                Save Time
              </h5>
              <p>
                It is a long established fact that a reader will be distracted by the readable content
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="box">
            <div class="img-box">
              <img src={Man} alt=""/>
            </div>
            <div class="detail-box">
              <h5>
                Save Stress
              </h5>
              <p>
                It is a long established fact that a reader will be distracted by the readable content
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Feature