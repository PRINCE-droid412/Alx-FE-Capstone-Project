import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import './index.css'; // Import Tailwind CSS here
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (city) => {
    const API_KEY = '67f57b227f24cf942e1f6de7008a0fdf'; // My OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchWeatherByLocation = async (lat, lon) => {
      const API_KEY = '67f57b227f24cf942e1f6de7008a0fdf';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Unable to fetch weather data');
        const data = await response.json();
        setWeather(data);
        setError('');
      } catch (err) {
        setWeather(null);
        setError(err.message);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => setError('Location access denied')
      );
    } else {
      setError('Geolocation not supported by your browser');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-8 bg- shadow-lg">
      <h1 className="text-3xl font-bold mb-8">Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default App;
