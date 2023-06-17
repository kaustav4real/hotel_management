import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <nav className="flex justify-center w-100 shadow-md p-3 mainHeaderNav">
      <div className="w-100 max-w-4xl">
        <form
          method="post"
          action="/search"
          className="flex shadow-sm max-w-5xl"
        >
          <input
            type="text"
            placeholder="Search"
            className="text-xs outline-none"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default Header;
