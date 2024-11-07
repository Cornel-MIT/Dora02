import {
    USER_LOGIN,
    USER_LOGOUT,
    UPDATE_PROFILE,
    SET_PURCHASE_HISTORY
  } from './types';
  
  const initialState = {
    isAuthenticated: false,
    user: null,
    purchaseHistory: [],
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      preferences: {}
    }
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LOGIN:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload
        };
      case USER_LOGOUT:
        return initialState;
      case UPDATE_PROFILE:
        return {
          ...state,
          profile: {
            ...state.profile,
            ...action.payload
          }
        };
      case SET_PURCHASE_HISTORY:
        return {
          ...state,
          purchaseHistory: action.payload
        };
      default:
        return state;
    }
  };