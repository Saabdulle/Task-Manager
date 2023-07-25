import React from "react";
import { NavLink, Outlet } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <header>
        <nav>
          <div className="Navbar">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/tasks">Tasks</NavLink>
              </li>
              <li>
                <NavLink to="/search">Search</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
