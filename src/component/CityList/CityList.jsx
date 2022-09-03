import './CityList.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import {CityCard} from '../CityCard';

export const CityList = () => {

  const historyCities = useSelector(state => state.history.history);

  const historyCitiesLimit = historyCities.slice(0, 3);

  return (
    <div>
      <div className="list__map">
        {historyCities && 
          historyCitiesLimit.map(city => <div key={city.lat}>
            <CityCard city={city} />
          </div>
          )
        }
      </div>
    </div>
  )
};
