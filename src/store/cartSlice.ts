import { createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totale: 0
  },
  reducers: {
    addItemToCart: (items: any, action) => {
      const { name, amount } = action.payload;
      items.cart.push({
        name,
        amount,
      });
    },
    getCartItems: (items: any) => {
        return items.cart;
    },
    removeItemFromCart: (items: any) => items.cart.pop(),
    updateTotal: (items: any, action) => {
        items.totale += action.payload.totale;
    }
  },
});

export const { addItemToCart, removeItemFromCart, getCartItems, updateTotal } = slice.actions;

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