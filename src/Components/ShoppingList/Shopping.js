import React, { useEffect, useState } from "react";
import "./shopping.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectShoppingList } from "./shoppingSlice";
import ROUTES from "../../App/routes";

export const ShoppingList = () => {
  let listIds = JSON.parse(localStorage.getItem("listIds"));
  if (!listIds) {
    listIds = [];
  }
  // console.log(listIds);
  const navigate = useNavigate();
  const lists = useSelector(selectShoppingList);
  const [selectedId, setSelectedId] = useState("");
  // const dispatch = useDispatch();
  let optionList = [];

  useEffect(() => {}, [selectedId]);

  const handleClick = (e) => {
    setSelectedId(e.target.value);
    navigate(ROUTES.shoppingSelectedRoute(e.target.value));
  };

  if (listIds.length > 0) {
    // eslint-disable-next-line
    listIds.map((listsId) => {
      // console.log(lists);
      optionList.push(
        <button
          value={lists[listsId].id}
          key={lists[listsId].id}
          className="button-option"
          onClick={handleClick}
        >
          {lists[listsId].name}
        </button>
      );
    });
  }

  return (
    <div className="shopping-container">
      <NavLink className="new-shopping-list" to="/newShoppingList">
        Create new shopping list
      </NavLink>
      <div className="option-list">{optionList}</div>
      <Outlet />
    </div>
  );
};
