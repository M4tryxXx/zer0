import React, { useEffect, useState } from "react";
import "./planner.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPlannerList } from "./plannerSlice";
import ROUTES from "../../App/routes";

export const PlannerList = () => {
  let plansIds = JSON.parse(localStorage.getItem("plansIds"));
  if (!plansIds) {
    plansIds = [];
  }
  const navigate = useNavigate();
  const plans = useSelector(selectPlannerList);
  const [selectedId, setSelectedId] = useState("");
  // const dispatch = useDispatch();
  let optionPList = [];

  useEffect(() => {}, [selectedId]);

  const handleClick = (e) => {
    setSelectedId(e.target.value);
    navigate(ROUTES.planRoute(e.target.value));
  };

  if (plansIds.length > 0) {
    // eslint-disable-next-line
    plansIds.map((planId) => {
      // console.log(lists);
      if (plans[planId]) {
        optionPList.push(
          <button
            value={plans[planId].id}
            key={plans[planId].id}
            className="button-option"
            onClick={handleClick}
          >
            {plans[planId].name}
          </button>
        );
      }
    });
  }

  return (
    <div className="planner-container">
      <NavLink className="new-planner-list" to="/newPlanList">
        Create new Planner!
      </NavLink>
      <div className="option-list">{optionPList}</div>
      <Outlet />
    </div>
  );
};
