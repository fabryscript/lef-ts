import { createSlice, createSelector } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ingredients",
  initialState: [],
  reducers: {
    addIngredients: (ingredients: any, action) => {
      const { ingredientName } = action.payload;
      if (ingredients.includes(ingredients.name === ingredientName.name)) {
        return;
      } else {
        ingredients.push({
          name: ingredientName,
        });
      }
    },
  },
});

export const { addIngredients } = slice.actions;

export default slice.reducer;

// Selectors

export const getCurrentIngredients = createSelector(
  (state: any) => state.ingredients,
  (ingredients: Array<any>) => ingredients.map((ingredient) => ingredient)
);
