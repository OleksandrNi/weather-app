import { configureStore } from '@reduxjs/toolkit';
import currentCityReducer from './currentCitySlice';
import historyReducer from './historySlice';
import nativeCityReducer from './nativeCitySlice';

export default configureStore({
  reducer: {
    history: historyReducer,
    currentCity: currentCityReducer,
    nativeCity: nativeCityReducer,
  }
});