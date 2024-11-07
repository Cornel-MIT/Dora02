import {
    USER_LOGIN,
    USER_LOGOUT,
    UPDATE_PROFILE,
    SET_PURCHASE_HISTORY
  } from './types';
  
  export const loginUser = (userData) => ({
    type: USER_LOGIN,
    payload: userData
  });
  
  export const logoutUser = () => ({
    type: USER_LOGOUT
  });
  
  export const updateProfile = (profileData) => ({
    type: UPDATE_PROFILE,
    payload: profileData
  });
  
  export const setPurchaseHistory = (history) => ({
    type: SET_PURCHASE_HISTORY,
    payload: history
  });