import { createSlice } from "@reduxjs/toolkit";
import { itemAddedToCart } from "./cartActions";

const slice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        itemAdded: (items: any, action) => {
            const {name, amount, total} = action.payload;
            items.cart.push({
                name,
                amount,
                total
            });
        },
        itemRemoved: (items: any, _action) => {
            items.cart.pop();
        }
    }
});

const {itemAdded, itemRemoved} = slice.actions;

export default slice.reducer;

// Action Creators

export const addItemToCart = (item: any) => (
    itemAddedToCart({
        name: item.name,
        amount: item.amount,
        total: item.total,
        type: itemAdded.type
    })
)

// loadCartItems