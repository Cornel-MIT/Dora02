import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART,
    CLEAR_CART
  } from './types';
  
  const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0
  };
  
  export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART: {
        const existingItem = state.items.find(item => item._id === action.payload._id);
        let updatedItems;
        
        if (existingItem) {
          updatedItems = state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
        } else {
          updatedItems = [...state.items, action.payload];
        }
  
        const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        
        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalPrice
        };
      }
  
      case REMOVE_FROM_CART: {
        const updatedItems = state.items.filter(item => item._id !== action.payload);
        const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        
        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalPrice
        };
      }
  
      case UPDATE_CART: {
        const totalItems = action.payload.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = action.payload.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        return {
          ...state,
          items: action.payload,
          totalItems,
          totalPrice
        };
      }
  
      case CLEAR_CART:
        localStorage.removeItem('cart');
        return initialState;
  
      default:
        return state;
    }
  };
  