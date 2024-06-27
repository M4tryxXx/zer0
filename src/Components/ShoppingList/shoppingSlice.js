import { createSlice } from "@reduxjs/toolkit";

const retData = localStorage.getItem("shoppingList");
let retrievedLists = JSON.parse(retData);
if (!retData) {
  retrievedLists = {};
}

const shoppingSlice = createSlice({
  name: "shopping",
  initialState: {
    shoppingLists: retrievedLists,
    toggledList: {},
  },
  reducers: {
    createShoppingList: (state, action) => {
      const { id } = action.payload;
      state.shoppingLists[id] = action.payload;
    },
    deleteList: (state, action) => {
      const { shoppingLists } = action.payload;
      state.shoppingLists = shoppingLists;
    },
    addItem: (state, action) => {
      const { id, item } = action.payload;
      state.shoppingLists[id].list.unshift(item);
    },
    deleteItem: (state, action) => {
      const { id, list } = action.payload;
      state.shoppingLists[id].list = list;
    },
    clearList: (state, action) => {
      const { id, list } = action.payload;
      state.shoppingLists[id].list = list;
    },
    toggleState: (state, action) => {
      const { id, name } = action.payload;
      state.shoppingLists[id].toggled[name] = action.payload;
    },
  },
});

export const selectShoppingList = (state) => state.shopping.shoppingLists;
export const selectToggled = (state) => state.shopping.toggledList;
export const {
  createShoppingList,
  deleteList,
  addItem,
  deleteItem,
  clearList,
  toggleState,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;
