import React, { useEffect, useState } from "react";
import logo from "../logos/NETFLIX.png";
import "./Nav.css";
function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    };
    window.addEventListener("scroll", handleScroll, false);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  });
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={logo} alt="NETFLIX LOGO" />
      <img
        className="nav__avatar"
        src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
        alt="NETFLIX LOGO"
      />
    </div>
  );
}

export default Nav;
