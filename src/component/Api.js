import axios from 'axios';

export const getWeather = (lat, lng) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=539935f05212a1e4342dec030797e92e`
  );
};
