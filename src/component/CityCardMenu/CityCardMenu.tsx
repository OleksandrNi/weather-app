import './CityCardMenu.scss';

import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hook';
import { deleteCityInHistory, addCityInHistory } from '../../store/historySlice';
import { callCityFromHistory } from '../../store/currentCitySlice';
import axios from 'axios';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

type City = {
  country: string;
  name: string;
  lat: string;
  lng: string;
}

type CityCardProps = {
  city: City;
} 

interface WeatherCity {
  name: string;
  sys: {
    country: string
  };
  main: {
    feels_like: string;
    temp: number,
    humidity: number,
    pressure: number,
    temp_max: string;
    temp_min: string;
  }
  wind: {
    speed: number
  }
  weather: [{
    icon: string,
  }]
}


export const CityCardMenu: React.FC<CityCardProps> = ({city}) => {
  const [cityListWeather, setCityListWeather] = useState<WeatherCity>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (city) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&units=metric&appid=539935f05212a1e4342dec030797e92e`).then(
        resp => setCityListWeather(resp.data)
      )
    };
  },[]);

  const deleteCity = () => {
    dispatch(deleteCityInHistory(city.lat));
  };

  const callCity = () => {
    dispatch(callCityFromHistory(city));
    dispatch(deleteCityInHistory(city.lat));
    dispatch(addCityInHistory(city));
  }

  return (
    <div className='cardMenu'>
      {cityListWeather && <Card sx={{ width: 400, background: 'rgba(235, 217, 241, 0.1)' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
          <div>
            <Typography onClick={callCity} gutterBottom variant="h6" component="div" sx={{ height: 8, cursor: 'pointer', fontWeight: 'bold' }}>
              {city.name}, {city.country}
            </Typography>
          </div>
          <div className='cardMenu__button'>
            <Button onClick={deleteCity} size="small" sx={{color: 'black', fontWeight: 'bold' }}>
              delete
            </Button>
          </div>
        </CardContent>

        <div className='cardMenu__weather' onClick={callCity}>
          <div className='cardMenu__weather-icon'>
            <img src={`http://openweathermap.org/img/w/${cityListWeather.weather[0].icon}.png`} alt="weather logo" />
          </div>
          <div className='cardMenu__weather-temp'>
          {cityListWeather.main.temp} °C
          </div>
        </div>
      </Card>}
    </div>
  )
};
