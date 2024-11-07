import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART,
    CLEAR_CART
  } from './types';
  
  export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product
  });
  
  export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId
  });
  
  export const updateCart = (items) => ({
    type: UPDATE_CART,
    payload: items
  });
  
  export const clearCart = () => ({
    type: CLEAR_CART
  });
  