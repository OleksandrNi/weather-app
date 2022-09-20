import './CurrentCity.scss';

import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hook';
import { addCityInHistory } from '@store/historySlice';
import { getWeather } from '@component/Api';

import ThermostatIcon from '@mui/icons-material/Thermostat';
import CompressIcon from '@mui/icons-material/Compress';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import Button from '@mui/material/Button';

export const CurrentCity: React.FC = () => {
  const currentCity = useAppSelector((state) => state.currentCity.currentCity);
  const nativeCity = useAppSelector((state) => state.nativeCity.nativeCity);
  const historyCities = useAppSelector((state) => state.history.history);
  const dispatch = useAppDispatch();

  const [currentWeather, setCurrentWeather] = useState(nativeCity);

  useEffect(() => {
    if (nativeCity) {
      setCurrentWeather(nativeCity);
    }
  }, [nativeCity]);

  useEffect(() => {
    if (currentCity.name.length > 0) {
      getWeather(currentCity.lat, currentCity.lng).then((resp) =>
        setCurrentWeather(resp.data)
      );
    } else if (historyCities.length > 0) {
      getWeather(historyCities[0].lat, historyCities[0].lng).then((resp) =>
        setCurrentWeather(resp.data)
      );
    }
  }, [currentCity]);

  const addInListCity = () => {
    if (currentCity.name.length > 0) {
      dispatch(addCityInHistory(currentCity));
    }
  };

  return (
    <div className="form">
      {currentWeather.name.length > 0 ? (
        <div className="form__data">
          <div className="form__data-left">
            <div className="form__data-place">
              {currentWeather.name}, {currentWeather.sys.country}
            </div>
            <div className="form__data-current">
              <img
                className="form__data-icon"
                src={
                  currentWeather.weather[0].icon &&
                  `http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`
                }
                alt="icon"
              />
              <div className="form__data-temperature">
                {currentWeather.main.temp} °C
              </div>
            </div>
            {currentCity.name.length ? (
              <Button
                onClick={addInListCity}
                sx={{ color: 'black', fontWeight: 'bold' }}
              >
                add city in list
              </Button>
            ) : null}
          </div>

          <div className="form__data-right">
            <div className="form__data-desc">
              <ThermostatIcon /> Feels {currentWeather.main.feels_like} °C
            </div>
            <div className="form__data-desc">
              <AirIcon /> Wind {currentWeather.wind.speed} m/s
            </div>
            <div className="form__data-desc">
              <CompressIcon /> Pressure {currentWeather.main.pressure} kPa
            </div>
            <div className="form__data-desc">
              <OpacityIcon /> Humidity {currentWeather.main.humidity} %
            </div>
            <div className="form__data-desc">
              <ThermostatIcon /> Max {currentWeather.main.temp_max} °C
            </div>
            <div className="form__data-desc">
              <ThermostatIcon /> Min {currentWeather.main.temp_min} °C
            </div>
          </div>
        </div>
      ) : (
        <h2>Choose city in search bar</h2>
      )}
    </div>
  );
};
