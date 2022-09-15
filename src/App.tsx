import './App.scss';

import { useEffect } from 'react';
import { useAppSelector } from './hook';
import {Header} from './component/Header';
import {CurrentCity} from './component/CurrentCity';
import {CityList} from './component/CityList';


function App() {
  const historyCities = useAppSelector(state => state.history.history);

  useEffect(() => {
    localStorage.setItem('historyCities', JSON.stringify(historyCities));
  }, [historyCities]);

  return (
    <div className="App">
      <div className='header'>
        <Header/>
      </div>
      <div className="form">
        <CurrentCity />
      </div>
      <div className="list">
        <CityList />
      </div>
      
    </div>
  );
}

export default App;
