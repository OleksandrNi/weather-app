import { City, Weather } from '@types';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

import { RootState, AppDispatch } from './store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useHistoryCitiesSelector = () => useAppSelector((state: RootState): City[] =>
  state.history.history);

export const useCurrentCitiesSelector = () => useAppSelector((state: RootState): City =>
  state.currentCity.currentCity);

export const useNativeCitiesSelector = () => useAppSelector((state: RootState): Weather =>
  state.nativeCity.nativeCity);

