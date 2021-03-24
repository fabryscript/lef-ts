import { createSlice, createSelector } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ingredients",
  initialState: [],
  reducers: {
    addIngredients: (ingredients: any, action) => {
      const {
        name,
        price,
        vegan,
        vegetarian,
        imageURI,
        phase,
        macronut,
      } = action.payload;
      ingredients.push({
        name,
        price,
        vegan,
        vegetarian,
        imageURI,
        phase,
        macronut,
      });
    },
    removeAllIngredients: (ingredients: any) => {
      ingredients.length = 0;
    },
  },
});

export const { addIngredients, removeAllIngredients } = slice.actions;

export default slice.reducer;

// Selectors

export const getCurrentIngredients = createSelector(
  (state: any) => state.ingredients,
  (ingredients: Array<any>) => ingredients.map((ingredient) => ingredient)
);
