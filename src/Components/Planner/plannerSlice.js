import { createSlice } from "@reduxjs/toolkit";

const retData = localStorage.getItem("planners");
let retrievedPlans = JSON.parse(retData);
if (!retData) {
  retrievedPlans = {};
}

const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    plannerLists: retrievedPlans,
    toggledPlansList: {},
  },
  reducers: {
    createPlannerList: (state, action) => {
      const { id } = action.payload;
      state.plannerLists[id] = action.payload;
    },
    deletePList: (state, action) => {
      const { plannerLists } = action.payload;
      state.plannerLists = plannerLists;
    },
    addPlan: (state, action) => {
      const { id, item } = action.payload;
      state.plannerLists[id].list.unshift(item);
    },
    deletePlan: (state, action) => {
      const { id, list } = action.payload;
      state.plannerLists[id].list = list;
    },
    clearPList: (state, action) => {
      const { id, list } = action.payload;
      state.plannerLists[id].list = list;
    },
    togglePlanState: (state, action) => {
      const { id, name } = action.payload;
      state.plannerLists[id].toggled[name] = action.payload;
    },
    addIcon: (state, action) => {
      const { id, match } = action.payload;
      state.plannerLists[id].images[match] = action.payload;
    },
  },
});

export const selectPlannerList = (state) => state.planner.plannerLists;
export const selectToggledPlan = (state) => state.planner.toggledPlansList;
export const {
  createPlannerList,
  deletePList,
  addPlan,
  deletePlan,
  clearPList,
  togglePlanState,
  addIcon,
} = plannerSlice.actions;
export default plannerSlice.reducer;
