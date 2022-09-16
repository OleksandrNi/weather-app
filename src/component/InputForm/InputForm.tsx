import './InputForm.scss';

import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hook';
import { citiesList } from './cities';
import { addCurrentCity } from '../../store/currentCitySlice';
import { City } from '../../types';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const InputForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [queryInput, setQueryInput] = useState('');
  const [searchCities, setSearchCities] = useState<City[]>([]);
  
  const city: City[] = citiesList.filter(city => city.name.toLowerCase().includes(queryInput));
  
  useEffect(() => {
    setSearchCities(city.slice(0, 10));
  },[queryInput]);

  const addCity = (value: City | null) => {
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
          getOptionLabel={(option: City) => `${option.name}, ${option.country}`}
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
