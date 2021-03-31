import { combineReducers } from "redux";
import cartReducer from "./cartSlice";
import ingredientsReducer from "./ingredientsSlice";

export default combineReducers({
  cart: cartReducer,
  ingredients: ingredientsReducer,
});
