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
import axios from 'axios';


const CityCard = (city) => {
  const [cityListWeather, setCityListWeather] = useState()
  const dispatch = useDispatch();


  useEffect(() => {
    if (city) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.city.lat}&lon=${city.city.lng}&units=metric&appid=539935f05212a1e4342dec030797e92e`).then(
        resp => setCityListWeather(resp.data)
      )
    }
  },[])

  const deleteCity = () => {
    dispatch(deleteCityInHistory(city.city.lat))
  }

  const callCity = () => {
    dispatch(callCityFromHistory(city.city))
  }

  return (
    <div>
      {cityListWeather && <Card sx={{ maxWidth: 200 }}>
        <CardMedia
          component="img"
          height="140"
          image={`http://openweathermap.org/img/w/${cityListWeather.weather[0].icon}.png`}
          alt="weather logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ height: 40, mb: '25px' }}>
            {cityListWeather.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Temp ''
            {city.city.lat}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={deleteCity} size="small">Delete</Button>
        </CardActions>
        <CardActions>
          <Button onClick={callCity} size="small">Call</Button>
        </CardActions>
      </Card>}
    </div>
  )
}

export default CityCard