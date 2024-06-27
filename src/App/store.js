import { configureStore } from "@reduxjs/toolkit";
import shoppingSlice from "../Components/ShoppingList/shoppingSlice";
import plannerSlice from "../Components/Planner/plannerSlice";

export const store = configureStore({
  reducer: {
    shopping: shoppingSlice,
    planner: plannerSlice,
  },
});
