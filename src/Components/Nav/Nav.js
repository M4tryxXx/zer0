import React from "react";
import { NavLink } from "react-router-dom";
import ROUTES from "../../App/routes";

export default function Nav() {
  return (
    <div id="nav-div">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.shoppingListRoute()}>Shopping List</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.plansRoute()}>Planner</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
