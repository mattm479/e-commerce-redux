import { createReducer, current } from "@reduxjs/toolkit";
import {
  updateProducts,
  addProduct,
  updateCartQuantity,
  removeFromCart,
  addMultipleProducts,
  updateCategories,
  updateCurrentCategory,
  clearCart,
  toggleCart
} from './actions.js';

const initState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: ''
};

export const productCartReducer = createReducer(initState, (builder) => {
  builder.addCase(addProduct, (state, action) => {
    return {
      ...state,
      cartOpen: true,
      cart: [...state.cart, action.payload.product],
    }
  });

  builder.addCase(addMultipleProducts, (state, action) =>  {
    return {
      ...state,
      cart: [...state.cart, ...action.payload.products],
    }
  });

  builder.addCase(updateProducts, (state, action) => {
    return {
      ...state,
      products: [...action.payload.products],
    }
  });

  builder.addCase(updateCartQuantity, (state, action) => {
    const index= state.cart.findIndex((item) => item._id === action.payload.item._id);

    return {
      ...state,
      cartOpen: true,
      cart: [...state.cart.slice(0,index), action.payload.item, ...state.cart.slice(index+1)]
    }
  });

  builder.addCase(removeFromCart, (state, action) => {
    let newState = state.cart.filter((product) => {
      return product._id !== action.payload._id;
    });

    return {
      ...state,
      cartOpen: newState.length > 0,
      cart: newState,
    };
  });

  builder.addCase(clearCart, (state, action) => {
    return {
      ...state,
      cartOpen: false,
      cart: [],
    };
  });

  builder.addCase(toggleCart, (state, action) => {
    return {
      ...state,
      cartOpen: !state.cartOpen,
    };
  });

  builder.addCase(updateCategories, (state, action) => {
    return {
      ...state,
      categories: [...action.payload.categories],
    };
  });

  builder.addCase(updateCurrentCategory, (state, action) => {
    return {
      ...state,
      currentCategory: action.payload.currentCategory,
    };
  });
});
