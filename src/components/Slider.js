import React from "react"
import { slide as Menu } from "react-burger-menu"

export default function Slider(props) {
  return (
    <Menu
      right
      isOpen={props.isOpen}
      customBurgerIcon={false}
      customCrossIcon={false}
    >
      <a id="home" className="menu-item" href="/">
        Home
      </a>

      <a id="about" className="menu-item" href="/about">
        About
      </a>
      <a id="contact" className="menu-item" href="/contact">
        Contact
      </a>
      <a href="www.google.com" className="menu-item">
        Settings
      </a>
    </Menu>
  )
}
