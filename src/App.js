import './App.css';
import { useState } from 'react';
import Header from './component/Header/Header';
import InputForm from './component/InputForm/InputForm';
import CityList from './component/CityList/CityList';


function App() {
  const [historyCities, setHistoryCities] = useState([])

  console.log('history', historyCities)

  return (
    <div className="App">
      <div className='header'>
        <Header/>
      </div>
      <div className="form">
        <InputForm historyCities={historyCities} setHistoryCities={setHistoryCities} />
      </div>
      <div className="list">
        <CityList historyCities={historyCities} />
      </div>
      
    </div>
  );
}

export default App;
