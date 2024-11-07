import { createStore, combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  
});

export const store = createStore(rootReducer);