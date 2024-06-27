import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import { ShoppingList } from "../Components/ShoppingList/Shopping";
import ShopList from "../Components/ShoppingList/ShopList";
import { PlannerList } from "../Components/Planner/Planner";
import NewShoppingListForm from "../Components/ShoppingList/NewShoppingListForm";
import NewPlannerForm from "../Components/Planner/NewPlanForm";
import PlanList from "../Components/Planner/PlanList";
import ErrorHandling from "../layouts/ErrorHandling";
import Index from "../Components/Index/Index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Index />} />
          <Route path="shopping" element={<ShoppingList />}>
            <Route path=":listId" element={<ShopList />} />
          </Route>
          <Route path="newShoppingList" element={<NewShoppingListForm />} />
          <Route path="plans" element={<PlannerList />}>
            <Route path=":planId" element={<PlanList />} />
          </Route>
          <Route path="newPlanList" element={<NewPlannerForm />} />
          <Route path="*" element={<ErrorHandling />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
