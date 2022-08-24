import React from 'react';
import { useSelector } from 'react-redux';
import './CityList.scss';
import CityCard from '../CityCard/CityCard';

const CityList = () => {

  const historyCities = useSelector(state => state.history.history);

  return (
    <div className="list__map">
      {historyCities && 
        historyCities.map(city => <div key={city.lat}>
          <CityCard city={city} />
        </div>
        )
      }
    </div>
  )
}

export default CityList;