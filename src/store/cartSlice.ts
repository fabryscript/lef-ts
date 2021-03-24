import { createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totale: 0,
    currentOrderRestaurantName: ""
  },
  reducers: {
    addItemToCart: (items: any, action) => {
      const { name, price, quantity } = action.payload;
      items.cart.push({
        name,
        price,
        quantity
      });
    },
    getCartItems: (items: any) => {
        return items.cart;
    },
    updateTotal: (items: any, action) => {
        items.totale += action.payload.totale;
    },
    updateRestaurantName: (items: any, action) => {
      items.currentOrderRestaurantName = action.payload.restaurantName;
    },
    resetCart: (items: any) => {
      items.cart.length = 0;
    }
  },
});

export const { addItemToCart, resetCart, getCartItems, updateTotal, updateRestaurantName } = slice.actions;

export default slice.reducer;

// Selectors

export const getCurrentCartItems = createSelector(
    (state: any) => state.cart.cart,
    (items: Array<any>) => items.map((item) => item)
)

export const getCurrentTotal = createSelector(
    (state: any) => state.cart.totale,
    (totale: number) => totale
)

export const getCurrentOrderRestaurantName = createSelector(
    (state: any) => state.cart.currentOrderRestaurantName,
    (currentName: string) => currentName
)