import './Header.scss';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNativeCity } from '../../store/nativeCitySlice';
import axios from 'axios';
import { CityMenu } from '../CityMenu';
import { InputForm } from '../InputForm/InputForm';

import ThermostatIcon from '@mui/icons-material/Thermostat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CompressIcon from '@mui/icons-material/Compress';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';

export const Header = () => {
  const dispatch = useDispatch();
  const nativeCity = useSelector(state => state.nativeCity.nativeCity);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });
  },[]);

  function success({ coords }) {
    const { latitude, longitude } = coords;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=539935f05212a1e4342dec030797e92e`)
    .then(
      resp => dispatch(setNativeCity(resp.data))
    );
  };
  
  function error({ message }) {
    console.log(message);
  };

  return (
    <div className='header__content'>
      {nativeCity 
       ? <div className='header__current'>
        <div><LocationOnIcon /></div>
        <div>{nativeCity.name}</div>
        <div><ThermostatIcon />{nativeCity.main.temp} °C</div>
        <div><OpacityIcon />{nativeCity.main.humidity} %</div>
        <div><CompressIcon />{nativeCity.main.pressure} kPa</div>
        <div><AirIcon />{nativeCity.wind.speed} m/s</div>
        <div><img src={`http://openweathermap.org/img/w/${nativeCity.weather[0].icon}.png`} alt="weather logo" /></div>
      </div>
      : <div className='header__welcome'>Weather App</div>
      }
      <InputForm />
      <CityMenu />
    </div>
  )
};
