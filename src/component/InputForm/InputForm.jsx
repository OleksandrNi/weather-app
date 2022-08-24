import './InputForm.scss';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import axios from 'axios';
import cities from 'cities.json';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { addCityInHistory } from '../../store/historySlice';
import { addCurrentCity } from '../../store/currentCitySlice';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

const InputForm = () => {
  const currentCity = useSelector(state => state.currentCity.currentCity);
  const dispatch = useDispatch();

  const [queryInput, setQueryInput] = useState('');
  const [searchCities, setSearchCities] = useState([]);
  const [currentWeather, setCurrentWeather] = useState('');
  const [weekWeather, setWeekWeather] = useState('');

  const city = cities.filter(city => city.name.toLowerCase().includes(queryInput));

  useEffect(() => {
    if (currentCity) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCity.lat}&lon=${currentCity.lng}&units=metric&appid=539935f05212a1e4342dec030797e92e`).then(
        resp => setCurrentWeather(resp.data)
      )
    }
  },[currentCity]);
  
  useEffect(() => {
    if (currentCity) {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentCity.lat}&lon=${currentCity.lng}&units=metric&appid=539935f05212a1e4342dec030797e92e`).then(
        resp => setWeekWeather(resp.data.list)
      )
    }
  },[currentCity]);

  useEffect(() => {
    setSearchCities(city.slice(0, 10));
  },[queryInput]);

  const addCity = (value) => {
    if(value) {
      dispatch(addCurrentCity(value));
    };
  };

  const addInListCity = () => {
      dispatch(addCityInHistory(currentCity));
  };

  return (
    <div className='form'>
      <form className='form__input'>
        <Autocomplete
          onChange={(event, value) => {addCity(value)}}
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
        <div className='form__data-date'>{new Date().toLocaleString()}</div>
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

        <Button onClick={addInListCity}>add city</Button>

      </div>}

    </div>
  )
}

export default InputForm;