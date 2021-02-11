import { combineReducers } from "redux";
import cartReducer from "./cartSlice"

export default combineReducers({
    cart: cartReducer
})