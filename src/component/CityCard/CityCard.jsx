import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { deleteCityInHistory } from '../../store/historySlice';
import { callCityFromHistory } from '../../store/currentCitySlice';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import './CityCard.scss';


const CityCard = (city) => {
  const [cityListWeather, setCityListWeather] = useState();
  const dispatch = useDispatch();


  useEffect(() => {
    if (city) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.city.lat}&lon=${city.city.lng}&units=metric&appid=539935f05212a1e4342dec030797e92e`).then(
        resp => setCityListWeather(resp.data)
      )
    }
  },[]);

  const deleteCity = () => {
    dispatch(deleteCityInHistory(city.city.lat));
  }

  const callCity = () => {
    dispatch(callCityFromHistory(city.city));
  }
  console.log('cityCard', city.city)
  console.log('cityWheather', cityListWeather)
  return (
    <div className='card'>
      {cityListWeather && <Card sx={{ width: 200, background: 'rgba(235, 217, 241, 0.1)' }}>
        <div className='card__button'>
          <Button onClick={deleteCity} size="medium" sx={{color: 'orange', fontWeight: 'bold' }}><HighlightOffIcon/></Button>
        </div>
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
            {city.city.name}, {city.city.country}
          </Typography>
        </CardContent>
        
      </Card>}
    </div>
  )
}

export default CityCard