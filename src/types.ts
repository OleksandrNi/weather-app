export interface City {
  country: string;
  name: string;
  lat: string;
  lng: string;
}

export interface CurrentCityState {
  currentCity: City;
}

export interface HistoryCityState {
  history: City[];
}

export interface Weather {
  name: string;
  sys: {
    country: string;
  };
  main: {
    feels_like: string;
    temp: number;
    humidity: number;
    pressure: number;
    temp_max: string;
    temp_min: string;
  };
  wind: {
    speed: number;
  };
  weather: [
    {
      icon: string;
    }
  ];
}

export interface NativeWeatherState {
  nativeCity: Weather;
  status?: string;
}

export interface CityCardProps {
  city: City;
}
