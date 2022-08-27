import { configureStore } from '@reduxjs/toolkit';
import currentCityReducer from './currentCitySlice';
import historyReducer from './historySlice';

export default configureStore({
  reducer: {
    history: historyReducer,
    currentCity: currentCityReducer,
  }
});