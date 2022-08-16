import { configureStore } from '@reduxjs/toolkit';
import filter from '../redux/slices/filterSlice';
import cart from '../redux/slices/cartSlice';
import pizza from '../redux/slices/pizzaSlice';


export default configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
