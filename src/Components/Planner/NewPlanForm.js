import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./newPlannerForm.css";
import { useDispatch } from "react-redux";
import { createPlannerList, addIcon } from "./plannerSlice";
import ROUTES from "../../App/routes";
import { useNavigate } from "react-router-dom";

export const plannerListIds = [];

export default function NewPlannerForm() {
  let plansIds = JSON.parse(localStorage.getItem("plansIds"));
  if (!plansIds) {
    plansIds = [];
  }

  const retData = localStorage.getItem("planners");
  let retrievedLists = {};
  if (!retData) {
    retrievedLists = {};
  } else {
    retrievedLists = JSON.parse(retData);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // const lists = useSelector(selectShoppingList);

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = uuidv4();
    if (!name) {
      return;
    }

    plansIds.push(id);
    localStorage.setItem("plansIds", JSON.stringify(plansIds));
    dispatch(
      createPlannerList({
        id: id,
        name: name,
        list: [],
        toggled: {},
        images: {},
      })
    );

    let obj = retrievedLists;
    obj[id] = {
      id: id,
      name: name,
      list: [],
      toggled: {},
      images: {},
    };

    localStorage.setItem("planners", JSON.stringify(obj));
    // console.log("Obj is : ", obj);

    navigate(ROUTES.planRoute(id));
  };

  return (
    <div className="form">
      <h3>Create New Planner</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="planner-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Numele Plannerului..."
        />
        <input
          type="submit"
          className="create-planner"
          value="Create Planner"
        />
      </form>
    </div>
  );
}
