import './App.scss';

import {Header} from '@component/Header';
import {CurrentCity} from '@component/CurrentCity';
import {CityList} from '@component/CityList';


function App() {
  return (
    <div className="App">
      <div className="header">
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
