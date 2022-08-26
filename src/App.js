import './App.scss';
import { useEffect } from 'react';
import Header from './component/Header/Header';
import InputForm from './component/InputForm/InputForm';
import CityList from './component/CityList/CityList';
import { useSelector } from 'react-redux';


function App() {
  const historyCities = useSelector(state => state.history.history);

  useEffect(() => {
    localStorage.setItem('historyCities', JSON.stringify(historyCities));
  }, [historyCities]);

  return (
    <div className="App">
      <div className='header'>
        <Header/>
      </div>
      <div className="form">
        <InputForm />
      </div>
      <div className="list">
        <CityList />
      </div>
      
    </div>
  );
}

export default App;
