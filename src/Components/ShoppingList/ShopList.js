import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectShoppingList,
  deleteList,
  addItem,
  toggleState,
  clearList,
  deleteItem,
} from "./shoppingSlice";
import {} from "./shoppingSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import ROUTES from "../../App/routes";
import "./shopping.css";
import ShoppingBackground from "../../images/shopping-list.jpg";

export default function ShopList() {
  const retData = localStorage.getItem("shoppingList");
  let retrievedLists = {};
  if (!retData) {
    retrievedLists = {};
  } else {
    retrievedLists = JSON.parse(retData);
  }

  let toggledState = JSON.parse(localStorage.getItem("toggled"));
  if (!toggledState) {
    toggledState = {};
  }

  const lists = useSelector(selectShoppingList);
  // const toggledList = useSelector(selectToggled);
  const [item, setItem] = useState("");
  const { listId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let listIds = JSON.parse(localStorage.getItem("listIds"));
  let stateList;

  if (!lists[listId] || !listId) {
    navigate(ROUTES.shoppingListRoute());
  }

  // console.log(lists[listId]);
  if (lists[listId]) {
    stateList = lists[listId].list;
  }
  const handleChange = (e) => {
    setItem(e.target.value);
    document.getElementById("add-item-to-list").style.border =
      "solid 1px white";
    if (document.getElementById("errorAddItem").style.display === "block") {
      document.getElementById("errorAddItem").style.display = "none";
    }
  };

  const handleToggle = (e) => {
    if (e.target.attributes.class) {
      if (e.target.attributes.class.value === "item") {
        let obj = retrievedLists;
        obj[listId].toggled[e.target.title] = {
          name: e.target.title,
          class: "disabledItem",
        };
        localStorage.setItem("shoppingList", JSON.stringify(obj));

        dispatch(
          toggleState({
            id: listId,
            name: e.target.title,
            class: "disabledItem",
          })
        );

        // console.log("Toggled state 2 is: ", toggledList);
      } else {
        let obj = retrievedLists;
        obj[listId].toggled[e.target.title] = {
          name: e.target.title,
          class: "item",
        };
        localStorage.setItem("shoppingList", JSON.stringify(obj));
        dispatch(
          toggleState({
            id: listId,
            name: e.target.title,
            class: "item",
          })
        );
        // console.log("Toggled state 2 is: ", toggledList[e.target.title]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (item) {
      if (document.getElementById("errorAddItem").style.display === "block") {
        document.getElementById("errorAddItem").style.display = "none";
      }
      dispatch(
        addItem({
          id: listId,
          item: item,
        })
      );
      setItem("");

      let obj = retrievedLists;
      let itemList = obj[listId].list;
      itemList.unshift(item);
      obj[listId].list = itemList;
      localStorage.setItem("shoppingList", JSON.stringify(obj));
    } else {
      document.getElementById("errorAddItem").style.display = "block";
      document.getElementById("add-item-to-list").style.border =
        "solid 2px red";
    }
  };

  const handleDelete = (e) => {
    const updatedList = retrievedLists[listId].list.filter(
      (item) => item !== e.target.value
    );
    dispatch(
      deleteItem({
        id: listId,
        list: updatedList,
      })
    );
    retrievedLists[listId].list = updatedList;
    localStorage.setItem("shoppingList", JSON.stringify(retrievedLists));
  };

  const handleListClear = () => {
    const updatedList = [];
    dispatch(
      clearList({
        id: listId,
        list: updatedList,
      })
    );
    retrievedLists[listId].list = updatedList;
    localStorage.setItem("shoppingList", JSON.stringify(retrievedLists));
  };

  const handleListDelete = () => {
    const newListIds = listIds.filter((item) => item !== listId);
    localStorage.setItem("listIds", JSON.stringify(newListIds));
    navigate(ROUTES.shoppingListRoute());
    const updatedList = Object.fromEntries(
      Object.entries(retrievedLists).filter((key) => key !== listId)
    );

    dispatch(
      deleteList({
        shoppingLists: updatedList,
      })
    );
    retrievedLists = updatedList;
    localStorage.setItem("shoppingList", JSON.stringify(retrievedLists));
  };

  return (
    <div className="list-container">
      <div className="input">
        <form className="input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={item}
            placeholder={
              lists[listId]
                ? `Add Item to ${lists[listId].name} list...`
                : "Select a list first..."
            }
            onChange={handleChange}
            id="add-item-to-list"
          />
          <input
            type="submit"
            className="submitItem"
            value={`Add to ${lists[listId].name} list `}
          />
        </form>
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
        <h4 className="list-info name">
          Shopping list {lists[listId] ? lists[listId].name : ""}!
        </h4>
      </div>
      <div
        className="list"
        style={{
          backgroundImage: `url("${ShoppingBackground}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: ".7",
        }}
      >
        {stateList ? (
          stateList.map((item, index) => (
            <div
              className={
                lists[listId].toggled[item]
                  ? lists[listId].toggled[item].class
                  : "item"
              }
              key={index}
              title={item}
              onClick={handleToggle}
            >
              <p>{item}</p>
              <button
                className="item-delete"
                value={item}
                onClick={handleDelete}
              >
                -
              </button>
            </div>
          ))
        ) : (
          <p className="list-info">
            Your shopping list {lists[listId] ? lists[listId].name : ""} is
            empty!
          </p>
        )}
      </div>

      {lists[listId] ? (
        <div className="list-control">
          <button onClick={handleListClear} className="button-control">
            {lists[listId] ? `Clear ${lists[listId].name} List` : ""}
          </button>
          <button className="button-control" onClick={handleListDelete}>
            {lists[listId] ? `Delete ${lists[listId].name} List` : ""}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
