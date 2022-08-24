import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './historySlice';
import currentCityReducer from './currentCitySlice';

export default configureStore({
  reducer: {
    history: historyReducer,
    currentCity: currentCityReducer,
  }
});