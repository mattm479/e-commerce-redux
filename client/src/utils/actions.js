import {createAction} from "@reduxjs/toolkit";


export const updateProducts = createAction("products/update");
export const addProduct = createAction("products/add");
export const addMultipleProducts = createAction("products/add-multiple");

export const removeFromCart = createAction("cart/remove");
export const clearCart = createAction("cart/clear");
export const updateCartQuantity = createAction("cart/update-quantity");
export const toggleCart = createAction("cart/toggle");

export const updateCategories = createAction("categories/update");
export const updateCurrentCategory = createAction("categories/update-current");
