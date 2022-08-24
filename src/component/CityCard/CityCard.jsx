import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';


const CityCard = (city) => {
  const [cityListWeather, setCityListWeather] = useState()

  useEffect(() => {
    if (city) {
      console.log('CardCity', city.city)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.city.lat}&lon=${city.city.lng}&units=metric&appid=539935f05212a1e4342dec030797e92e`).then(
        resp => setCityListWeather(resp.data)
      )
    }
  },[])

  console.log('CardCityWheather', cityListWeather)

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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>}
    </div>
  )
}

export default CityCard