import './CityCard.scss';

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteCityInHistory, addCityInHistory } from '../../store/historySlice';
import { callCityFromHistory } from '../../store/currentCitySlice';
import { Weather, CityCardProps } from '../../types'

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import axios from 'axios';

export const CityCard: React.FC<CityCardProps> = ({city}) => {
  const [cityListWeather, setCityListWeather] = useState<Weather>();
  const dispatch = useDispatch();

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
  };

  return (
    <div className='card'>
      {cityListWeather && <Card sx={{ width: 200, background: 'rgba(235, 217, 241, 0.1)' }}>
        <div className='card__weather'  onClick={callCity}>
          <div className='card__weather-icon'>
            <img src={`http://openweathermap.org/img/w/${cityListWeather.weather[0].icon}.png`} alt="weather logo" />
          </div>
          <div className='card__weather-temp'>
          {cityListWeather.main.temp} °C
          </div>
        </div>
        
        <CardContent>
          <Typography onClick={callCity} gutterBottom variant="h5" component="div" sx={{ height: 40, cursor: 'pointer' }}>
            {city.name}, {city.country}
          </Typography>
        </CardContent>

        <div className='card__button'>
          <Button onClick={deleteCity} size="medium" sx={{color: 'black', fontWeight: 'bold' }}>delete</Button>
        </div>
      </Card>}
    </div>
  )
};

export default CityCard;