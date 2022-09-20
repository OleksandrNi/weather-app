import { getWeather } from '@component/Api';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Weather, NativeWeatherState } from '@types';

const initialState: NativeWeatherState = {
  nativeCity: {
    name: '',
    sys: {
      country: '',
    },
    main: {
      feels_like: '',
      temp: 0,
      humidity: 0,
      pressure: 0,
      temp_max: '',
      temp_min: '',
    },
    wind: {
      speed: 0,
    },
    weather: [
      {
        icon: '',
      },
    ],
  },
  status: '',
};

export const fetchNativeCity = createAsyncThunk<
  object,
  undefined,
  { rejectValue: string }
>(
  'nativeCity/fetchDataByLocation',
  async (_, { rejectWithValue, dispatch }) => {
    const success = async (position: {
      coords: { latitude: number; longitude: number };
    }) => {
      const { latitude, longitude } = position.coords;
      const { data } = await getWeather(latitude, longitude);
      if (data) {
        return dispatch(setNativeCity(data));
      }
      return rejectWithValue('fetch weather by location is error');
    };
    const error = (e: { code: number; message: string }) => {
      // eslint-disable-next-line no-console
      console.warn(`ERROR(${e.code}): ${e.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }
);

const nativeCitySlice = createSlice({
  name: 'nativeCity',
  initialState,
  reducers: {
    setNativeCity(state, action: PayloadAction<Weather>) {
      state.nativeCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNativeCity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNativeCity.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(fetchNativeCity.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setNativeCity } = nativeCitySlice.actions;

export default nativeCitySlice.reducer;
