import React from 'react';

const WeatherCard = ({ weather }) => {
  const { name, main, weather: weatherInfo, wind } = weather;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-bold">{name}</h2>
      <img
        src={`http://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`}
        alt={weatherInfo[0].description}
        className="mx-auto"
      />
      <p className="text-lg">{weatherInfo[0].description}</p>
      <p>Temperature: {Math.round(main.temp)}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} km/h</p>
    </div>
  );
};

export default WeatherCard;
