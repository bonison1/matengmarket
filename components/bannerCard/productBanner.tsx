import React from 'react'
import "./productBanner.css"

export default function ProductBanner() {
  return (
    <div>
    <div className="wrap_card">
      <div className="card">
        <div className="content">
          <img src="./img1.jpg" alt="img" />
        </div>
      </div>
      <div className="card">
        <div className="content">
        <img src="./img4.jpg" alt="img" />
        </div>
      </div>
      <div className="card">
        <div className="content">
        <img src="./img3.jpg" alt="img" />
        </div>
      </div>
    
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
    </div>
  )
}
