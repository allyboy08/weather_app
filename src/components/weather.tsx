import React, { useState } from 'react';
import axios from 'axios';
// import { FiSearch } from 'react-icons/fi';

interface WeatherData {
  name: string;
  weather: {
    description: string;
    icon: string
  }[];
  main: {
    temp: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
}

const Weather: React.FC = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const search = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const API_KEY = '39c84ebf28374eb8445d4d56bff6402d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
    const response = await axios.get<WeatherData>(url);
    setWeather(response.data);
    setQuery('');
  };

  return (
    <div className="weather">
      <form onSubmit={search}>
        <input
          type="text"
          placeholder="Enter city name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">
          
          ok
        </button>
      </form>
      {weather && (
        <>
          <h2>{weather.name}</h2>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="weather icon"
          />
          <p>{weather.weather[0].description}</p>
          <p>Current Temperature: {weather.main.temp} °C</p>
          <p>Temperature Low: {weather.main.temp_min} °C</p>
          <p>Temperature Max: {weather.main.temp_max} °C</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default Weather;
