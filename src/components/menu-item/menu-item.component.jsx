import React from "react"

const MenuItem = (props) => (
  <div className="menu-item">
    <div className="content">
      <h1 className="title">{props.title}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
)

export default MenuItem
