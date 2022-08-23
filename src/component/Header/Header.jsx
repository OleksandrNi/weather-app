import './Header.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [nativeCity, setNativeCity] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true
    })
  },[])

  function success({ coords }) {
    const { latitude, longitude } = coords
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=539935f05212a1e4342dec030797e92e`).then(
      resp => setNativeCity(resp.data)
      )
    }
    console.log('nativeCity', nativeCity)
  
  function error({ message }) {
    console.log(message)
  }

  return (
    <div className='header'>
      Header
    </div>
  )
}

export default Header;