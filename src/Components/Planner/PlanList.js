import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectPlannerList,
  deletePList,
  addPlan,
  deletePlan,
  clearPList,
  togglePlanState,
  addIcon,
} from "./plannerSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import ROUTES from "../../App/routes";
import "./planner.css";
import sleep from "../../images/sleeping.jpg";
import sleep2 from "../../images/sleeping2.jpg";
import morning from "../../images/morning.webp";
import cleaning from "../../images/cleaning.jpg";
import hygine from "../../images/hygine.jpg";
import sport from "../../images/sport.jpg";
import gaming from "../../images/gaming.jpg";
import media from "../../images/media.jpg";
import PlanBackground from "../../images/planner.jpg";

const iconList = [
  { name: "Sleep", icon: sleep },
  { name: "Sleep 2", icon: sleep2 },
  { name: "Making Bed", icon: morning },
  { name: "Cleaning Room", icon: cleaning },
  { name: "Personal Hygine", icon: hygine },
  { name: "Sport", icon: sport },
  { name: "Free Time", icon: gaming },
  { name: "Video & Music", icon: media },
];

export default function PlanList() {
  const retData = localStorage.getItem("planners");
  let retrievedLists = {};
  if (!retData) {
    retrievedLists = {};
  } else {
    retrievedLists = JSON.parse(retData);
  }

  let toggledState = JSON.parse(localStorage.getItem("toggledPlans"));
  if (!toggledState) {
    toggledState = {};
  }

  const plans = useSelector(selectPlannerList);
  // const toggledList = useSelector(selectToggled);
  const [plan, setPlan] = useState("");

  const { planId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [icon, setIcon] = useState({});
  let plansIds = JSON.parse(localStorage.getItem("plansIds"));
  let stateList;
  useEffect(() => {}, [icon]);

  if (!plans[planId] || !planId) {
    navigate(ROUTES.plansRoute());
  }

  // console.log(lists[listId]);
  if (plans[planId]) {
    stateList = plans[planId].list;
  }

  const handleChange = (e) => {
    setPlan(e.target.value);
    document.getElementById("add-plan-to-list").style.border =
      "solid 1px white";
    if (document.getElementById("errorAddPlan").style.display === "block") {
      document.getElementById("errorAddPlan").style.display = "none";
    }
  };

  const handleToggle = (e) => {
    if (e.target.attributes.class) {
      if (e.target.attributes.class.value === "plan") {
        let obj = retrievedLists;
        obj[planId].toggled[e.target.title] = {
          name: e.target.title,
          class: "disabledPlan",
        };
        localStorage.setItem("planners", JSON.stringify(obj));
        dispatch(
          togglePlanState({
            id: planId,
            name: e.target.title,
            class: "disabledPlan",
          })
        );

        // console.log("Toggled state 2 is: ", toggledList);
      } else {
        let obj = retrievedLists;
        obj[planId].toggled[e.target.title] = {
          name: e.target.title,
          class: "plan",
        };
        localStorage.setItem("planners", JSON.stringify(obj));
        dispatch(
          togglePlanState({
            id: planId,
            name: e.target.title,
            class: "plan",
          })
        );
        // console.log("Toggled state 2 is: ", toggledList[e.target.title]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (plan) {
      if (document.getElementById("errorAddPlan").style.display === "block") {
        document.getElementById("errorAddPlan").style.display = "none";
      }
      dispatch(
        addIcon({
          id: planId,
          match: plan,
          name: icon.name,
          icon: icon.icon,
        })
      );

      dispatch(
        addPlan({
          id: planId,
          item: plan,
        })
      );

      let obj = retrievedLists;
      let planList = obj[planId].list;
      planList.unshift(plan);
      obj[planId].list = planList;
      obj[planId].images[plan] = icon;
      localStorage.setItem("planners", JSON.stringify(obj));
    } else {
      document.getElementById("errorAddPlan").style.display = "block";
      document.getElementById("add-plan-to-list").style.border =
        "solid 2px red";
    }
    setPlan("");
  };

  const handleDelete = (e) => {
    const updatedList = retrievedLists[planId].list.filter(
      (item) => item !== e.target.value
    );
    dispatch(
      deletePlan({
        id: planId,
        list: updatedList,
      })
    );
    retrievedLists[planId].list = updatedList;
    localStorage.setItem("planners", JSON.stringify(retrievedLists));
  };

  const handleListClear = () => {
    const updatedList = [];
    dispatch(
      clearPList({
        id: planId,
        list: updatedList,
      })
    );
    retrievedLists[planId].list = updatedList;
    localStorage.setItem("planners", JSON.stringify(retrievedLists));
  };

  const handleListDelete = () => {
    const newListIds = plansIds.filter((item) => item !== planId);
    localStorage.setItem("plansIds", JSON.stringify(newListIds));
    navigate(ROUTES.plansRoute());
    const updatedList = Object.fromEntries(
      Object.entries(retrievedLists).filter((key) => key !== planId)
    );

    dispatch(
      deletePList({
        plannerLists: updatedList,
      })
    );
    retrievedLists = updatedList;
    localStorage.setItem("planners", JSON.stringify(retrievedLists));
  };

  const handleChangeIcon = (e) => {
    Object.values(iconList).filter((key) => {
      if (key.name === e.target.value) {
        let obj = { name: key.name, icon: key.icon };
        setIcon(obj);
      }
    });
  };

  // console.log(plans[planId]);

  return (
    <div className="plans-container">
      <div className="input">
        <form className="input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={plan}
            placeholder={
              plans[planId]
                ? `Add item to ${plans[planId].name} planner...`
                : "No planner selected..."
            }
            onChange={handleChange}
            id="add-plan-to-list"
          />
          <select
            id="select-icon"
            value={icon.name ? icon.name : "Choose an icon"}
            onChange={handleChangeIcon}
          >
            <option value="">Pick an icon....</option>
            {iconList.map((option) => {
              return (
                <option key={option.name} value={option.name} id={option.icon}>
                  {option.name}
                </option>
              );
            })}
          </select>
          {icon.icon ? (
            <div
              style={{
                backgroundImage: `url("${icon.icon}")`,
                width: "80px",
                height: "80px",
                backgroundSize: "contain",
                backgroundPosition: "center",
                margin: "5px auto",
                backgroundRepeat: "no-repeat",
                boxShadow: "black 2px 1px 10px",
                borderRadius: "8px",
              }}
            ></div>
          ) : (
            ""
          )}
          <input type="submit" className="submitPlan" value="Add Plan" />
        </form>
        <p
          id="errorAddPlan"
          style={{
            color: "darkred",
            textAlign: "center",
            fontWeight: "bold",
            display: "none",
          }}
        >
          The form cannot be empty!
        </p>
        <h4 className="plan-info name">
          Planner {plans[planId] ? plans[planId].name : ""}
        </h4>
      </div>
      <div
        className="plans"
        style={{
          backgroundImage: `url("${PlanBackground}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: ".7",
        }}
      >
        {stateList ? (
          stateList.map((item, index) => (
            <div
              className={
                plans[planId].toggled[item]
                  ? plans[planId].toggled[item].class
                  : "plan"
              }
              key={index}
              title={item}
              onClick={handleToggle}
              style={{
                backgroundImage: plans[planId].images[item]
                  ? `url("${plans[planId].images[item].icon}")`
                  : "",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p>{item}</p>
              <button
                className="plan-delete"
                value={item}
                onClick={handleDelete}
              >
                -
              </button>
            </div>
          ))
        ) : (
          <p className="plans-info">
            Your Planner {plans[planId] ? plans[planId].name : ""} is empty!
          </p>
        )}
      </div>

      {plans[planId] ? (
        <div className="plans-control">
          <button onClick={handleListClear} className="button-control">
            {plans[planId] ? `Clear ${plans[planId].name} List` : ""}
          </button>
          <button className="button-control" onClick={handleListDelete}>
            {plans[planId] ? `Delete ${plans[planId].name} List` : ""}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
