import React from 'react'
import './CityList.scss';
import CityCard from '../CityCard/CityCard';

const CityList = ({historyCities}) => {

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