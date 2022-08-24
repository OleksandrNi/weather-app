import './InputForm.scss';
import React from 'react';
import axios from 'axios';
import cities from 'cities.json';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

const InputForm = ({ historyCities, setHistoryCities }) => {
  const [queryInput, setQueryInput] = useState('')
  const [searchCities, setSearchCities] = useState([])
  const [currentCity, setCurrentCity] = useState('')
  const [currentWeather, setCurrentWeather] = useState('')

  const city = cities.filter(city => city.name.toLowerCase().includes(queryInput))


  useEffect(() => {
    if (currentCity) {
      console.log('currentCity', currentCity)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCity.lat}&lon=${currentCity.lng}&units=metric&appid=539935f05212a1e4342dec030797e92e`).then(
        resp => setCurrentWeather(resp.data)
      )
    }
  },[currentCity])

  console.log('currentcity', currentCity)

  useEffect(() => {
    setSearchCities(city.slice(0, 10))
  },[queryInput])

  const addCurentCity = (value) => {
    if(value) {
      setCurrentCity(value)
      setQueryInput('')
    }
  }

  const addCityInHistory = () => {
    if (historyCities.findIndex(city => city.lat === currentCity.lat)) {
      setHistoryCities([
        ...historyCities,
        currentCity
      ])
    }
  }

  const date = new Date().toLocaleString();

  return (
    <div className='form'>
      <form className='form__input'>
        <Autocomplete
          onChange={(event, value) => {addCurentCity(value)}}
          options={searchCities}
          id="autocomplete-1"
          getOptionLabel={(option) => `${option.name}, ${option.country}`}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                onChange={e => setQueryInput(e.target.value)}
                variant="outlined"
                label="City"
              />
            );
          }}
          sx={{ mb: 2, minWidth: 200 }}
        />
    </form>

    {currentWeather && <div className='form__data'>
      <div className='form__data-date'>{date}</div>
      <div className='form__data-place'>{currentCity.name}, {currentCity.country}</div>
      <div className='form__data-current'>
        <img className='form__data-icon' src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`} alt="icon" />
        <div className='form__data-temperature'>{currentWeather.main.temp} °C</div> 
      </div>
      <div className='form__data-feels'>feels like {currentWeather.main.feels_like} °C</div> 
      <div className='form__data-max'>Max temperature {currentWeather.main.temp_max} °C</div> 
      <div className='form__data-min'>Min temperature {currentWeather.main.temp_min} °C</div> 
      <div className='form__data-pressure'>Pressure {currentWeather.main.pressure} kPa</div> 
      <div className='form__data-humidity'>Humidity {currentWeather.main.humidity} %</div> 

      <Button onClick={addCityInHistory}>add city</Button>

    </div>}

    </div>
  )
}

export default InputForm;