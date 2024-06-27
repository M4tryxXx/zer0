import React from "react";
import ShoppingCard from "../../images/shopping-list.jpg";
import PlannerCard from "../../images/planner.jpg";
import { Link } from "react-router-dom";
import "./index.css";

export default function Index() {
  return (
    <div className="cards-container">
      <Link to="/shopping">
        <div
          className="card"
          style={{ backgroundImage: `url("${ShoppingCard}")` }}
        ></div>
        <h4>Shopping Lists</h4>
      </Link>
      <Link to="/plans">
        <div
          className="card"
          style={{ backgroundImage: `url("${PlannerCard}")` }}
        ></div>
        <h4>To Do Planner</h4>
      </Link>
    </div>
  );
}
