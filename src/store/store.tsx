import { configureStore } from '@reduxjs/toolkit';
import currentCityReducer from './currentCitySlice';
import historyReducer from './historySlice';
import nativeCityReducer from './nativeCitySlice';

export const store = configureStore({
  reducer: {
    history: historyReducer,
    currentCity: currentCityReducer,
    nativeCity: nativeCityReducer,
  }
});

// export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;