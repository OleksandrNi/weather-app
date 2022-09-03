import './InputForm.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cities from 'cities.json';
import { addCurrentCity } from '../../store/currentCitySlice';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const InputForm = () => {
  const dispatch = useDispatch();

  const [queryInput, setQueryInput] = useState('');
  const [searchCities, setSearchCities] = useState([]);

  const city = cities.filter(city => city.name.toLowerCase().includes(queryInput));

  useEffect(() => {
    setSearchCities(city.slice(0, 10));
  },[queryInput]);

  const addCity = (value) => {
    if(value) {
      dispatch(addCurrentCity(value));
    };
  };

  return (
    <div className='form'>
      <form className='form__input'>
        <Autocomplete
        size="small"
          onChange={(event, value) => {addCity(value)}}
          options={searchCities}
          id="autocomplete-1"
          getOptionLabel={(option) => `${option.name}, ${option.country}`}
          renderInput={(params) => {
            return (
              <TextField
              {...params}
                onChange={e => setQueryInput(e.target.value)}
                sx={{ p: 0 }}
              />
            )
          }}
          sx={{ mb: 2, mt: 2, minWidth: 200, color: 'white', p: 0 }}
        />
      </form>
    </div>
  )
};
