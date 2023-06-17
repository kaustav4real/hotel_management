import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationMenu.css";

function NavigationMenu(props) {
  return (
    <div className="mobileMenuContainer">
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive ? { color: "black" } : { color: "gray" }
        }
      >
        <button className="menuIconsButton">
          <i className="menuIcons bi bi-house"></i>
        </button>
      </NavLink>

      <NavLink
        to="/trainers"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        <button className="menuIconsButton">
          <i className="menuIcons bi bi-people"></i>
        </button>
      </NavLink>

      <button className="menuIconsButton">
        <i className="menuIcons bi bi-bookmarks"></i>
      </button>

      <NavLink className="menuIconsLink" to="/profile">
        <button className={` menuIconsButton`}>
          {props.auth ? (
            <img src={props.imageSource} alt="" className="profilePicture" />
          ) : (
            <i className="menuIcons bi bi-person-circle"></i>
          )}
        </button>
      </NavLink>
    </div>
  );
}

export default NavigationMenu;
