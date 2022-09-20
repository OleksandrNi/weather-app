import './Header.scss';

import React, { useEffect } from 'react';
import { useNativeCitiesSelector, useAppDispatch } from '@hook';
import { fetchNativeCity } from '@store/nativeCitySlice';
import { CityMenu } from '@component/CityMenu';
import { InputForm } from '@component/InputForm';

import ThermostatIcon from '@mui/icons-material/Thermostat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CompressIcon from '@mui/icons-material/Compress';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const nativeCity = useNativeCitiesSelector();
  ;

  useEffect(() => {
    dispatch(fetchNativeCity());
  }, []);

  return (
    <div className="header__content">
      {nativeCity.name.length > 0 ? (
        <div className="header__current">
          <LocationOnIcon />
          <h3>{nativeCity.name}</h3>
          <ThermostatIcon />
          {nativeCity.main.temp} °C
          <OpacityIcon />
          {nativeCity.main.humidity} %
          <CompressIcon />
          {nativeCity.main.pressure} kPa
          <AirIcon />
          {nativeCity.wind.speed} m/s
          <img
            src={`http://openweathermap.org/img/w/${nativeCity.weather[0].icon}.png`}
            alt="weather logo"
          />
        </div>
      ) : (
        <div className="header__welcome">Weather App</div>
      )}
      <InputForm />
      <CityMenu />
    </div>
  );
};
