import './CityList.scss';

import React from 'react';
import { useHistoryCitiesSelector } from '@hook';
import { CityCard } from '@component/CityCard';

export const CityList: React.FC = () => {
  const historyCities = useHistoryCitiesSelector();

  const historyCitiesLimit = historyCities.slice(0, 3);

  return (
    <div>
      <div className="list__map">
        {historyCities &&
          historyCitiesLimit.map((city) => (
            <div key={city.lat}>
              <CityCard city={city} />
            </div>
          ))}
      </div>
    </div>
  );
};
