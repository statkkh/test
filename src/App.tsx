import { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const API_KEY = 'a336d33dbaf63ed2059518064e6e5b9f';
  const [result, setResult] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState('');

  const searchWeather = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(url);
        const data = response.data;
        // console.log(data);
        setResult(data);
        setCity(data.name);
        setTemperature(data.main.temp);
        setWeather(data.weather[0].main);
      } catch (error) {
        alert(error);
      }

    }

  };

  function convertFahrenheitToCelsius(fahrenheit: number) {
    const celsius = Math.round(((fahrenheit - 273.15) * 10)) / 10;
    return celsius;
  }

  return (
    <AppWrap>
      <div className="appContentWrap">
        <input
          type="text"
          placeholder="Input city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchWeather}
        />
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className='city'>{city}</div>
            <div className='temparature'>{convertFahrenheitToCelsius(temperature)}C</div>
            <div className='sky'>{weather}</div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
}



export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;
  border: 1px blue solid;

  .appContentWrap{
    left : 50%;
    top : 50%;
    transform : translate(-50%, -50%);
    position : absolute;
    padding : 20px;
  }
  input {
    border: 2px solid rgba(0, 0, 0, 1);
    padding: 12px;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 1);
  .city{
    font-size: 24px;
  }
  .temparature{
    font-size: 60px;
  }
  .sky{
    font-size : 20px;
    text-align  : center;
    margin-top: 8px;
  }
`;
