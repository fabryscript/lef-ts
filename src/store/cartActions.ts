import { createAction } from "@reduxjs/toolkit";

export const itemAddedToCart = createAction<any>("ITEM_ADDED_TO_CART");
export const itemRemovedFromCart = createAction<any>("ITEM_REMOVED_FROM_CART");