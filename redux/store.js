import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart.slice';
import {orderReducer} from './order.slice';

const reducer = {
  cart: cartReducer,
  order: orderReducer,
};

const store = configureStore({
  reducer,
});

export default store;