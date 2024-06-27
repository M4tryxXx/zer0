import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./newShoppingForm.css";
import { useDispatch } from "react-redux";
import { createShoppingList } from "./shoppingSlice";
import ROUTES from "../../App/routes";
import { useNavigate } from "react-router-dom";

export const shoppingListIds = [];

export default function NewShoppingListForm() {
  let listIds = JSON.parse(localStorage.getItem("listIds"));
  if (!listIds) {
    listIds = [];
  }

  const retData = localStorage.getItem("shoppingList");
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
    console.log(id);
    if (!name) {
      document.getElementById("errorAddItem").style.display = "block";
      document.getElementById("shop-name").style.border = "solid 2px red";
      return;
    }

    listIds.push(id);
    localStorage.setItem("listIds", JSON.stringify(listIds));
    dispatch(
      createShoppingList({
        id: id,
        name: name,
        list: [],
        toggled: {},
      })
    );

    let obj = retrievedLists;
    obj[id] = {
      id: id,
      name: name,
      list: [],
      toggled: {},
    };

    localStorage.setItem("shoppingList", JSON.stringify(obj));
    // console.log("Obj is : ", obj);

    navigate(ROUTES.shoppingSelectedRoute(id));
  };

  return (
    <div className="form">
      <h3>Create New Shopping List</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="shop-name"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
            document.getElementById("errorAddItem").style.display = "none";
            document.getElementById("shop-name").style.border =
              "solid 1px white";
          }}
          placeholder="Name of shopping list..."
        />
        <p
          id="errorAddItem"
          style={{
            color: "darkred",
            textAlign: "center",
            fontWeight: "bold",
            display: "none",
          }}
        >
          The form cannot be empty!
        </p>

        <input
          type="submit"
          className="create-shopping-list"
          value="Create List"
        />
      </form>
    </div>
  );
}
