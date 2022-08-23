import './App.css';
import axios from 'axios';
import cities from 'cities.json';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Header from './component/Header/Header';

function App() {
  const [queryInput, setQueryInput] = useState('')
  const [searchCityes, setSearchCityes] = useState([])
  const [choosenCity, setChoosenCity] = useState('')
  const [currentWeather, setCurrentWeather] = useState('')
  
  const city = cities.filter(city => city.name.toLowerCase().includes(queryInput))


  useEffect(() => {
    if (choosenCity) {
      console.log('choosenCity', choosenCity)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${choosenCity.lat}&lon=${choosenCity.lng}&units=metric&appid=539935f05212a1e4342dec030797e92e`).then(
        resp => setCurrentWeather(resp.data)
      )
      setQueryInput('')
    }
  },[choosenCity])

  useEffect(() => {
    setSearchCityes(city.slice(0, 10))
  },[queryInput])

  return (
    <div className="App">
      <Header />

      <form style={{width: '80px'}}>
        <Autocomplete
          onChange={(event, value) => {setChoosenCity(value)}}
          options={searchCityes}
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
          sx={{ mb: 2, minWidth: 400 }}
        />
    </form>

    {currentWeather && <div>
      <div>City {currentWeather.name}</div>
      <div>Temperature {currentWeather.main.temp} °C</div> 
      <div>feels like {currentWeather.main.feels_like} °C</div> 
      <div>Max temperature {currentWeather.main.temp_max} °C</div> 
      <div>Min temperature {currentWeather.main.temp_min} °C</div> 
      <div>Pressure {currentWeather.main.pressure} kPa</div> 
      <div>Humidity {currentWeather.main.humidity} %</div> 

    </div>}

    </div>
  );
}

export default App;
