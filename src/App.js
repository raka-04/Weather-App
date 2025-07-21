import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import clear from './Data/clear.mp4';
import cloudy from './Data/cloudy.mp4';
import rain from './Data/rain.mp4';
import snow from './Data/snow.mp4';

function App() {
  let [city,setcity]=useState('')
  let [allDetail,setallDetail]=useState()

  let getData=(event)=>{
    event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9f668ade9621eff2e8c942671ad9875d`)
    .then((res)=>res.json())
    .then((finaldata)=>{
      console.log(finaldata)
      setallDetail(finaldata)
    })
    setcity('')
  }
  const getWeatherVideo = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear':
        return clear;
      case 'clouds':
        return cloudy;
      case 'rain':
        return rain;
      case 'snow':
        return snow;
      default:
        return null; 
    }
  };

  const weatherCondition = allDetail?.weather?.[0]?.main;
  const videoSrc = getWeatherVideo(weatherCondition);

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${!videoSrc ? 'bg-slate-800' : ''}`}>
      {/* Conditional video background */}
      {videoSrc && (
        
        <>
          <video
            key={videoSrc} 
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-slate-900 bg-opacity-70 z-10" />
        </>
      )}

      {/* Main Content */}
      <div className="relative z-20 w-full min-h-screen text-center flex flex-col items-center pt-[60px]">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
          ClimoCast
        </h1>
        <p className="text-white text-sm sm:text-base italic mb-6 fade-in-subtitle">
          Instant weather, one search away.
        </p>

        <form
  onSubmit={getData}
  className="flex items-center bg-white rounded-full shadow-md px-3 py-2 w-50 max-w-sm"
>
  <input
    type="text"
    placeholder="Enter a valid city name..."
    value={city}
    onChange={(e) => setcity(e.target.value)}
    className="outline-none flex-1 text-gray-700 bg-transparent text-sm"
  />
  <button
    type="submit"
    className="text-white bg-slate-600 hover:bg-slate-700 px-3 py-1 rounded-full text-sm ml-2"
  >
    Search
  </button>
</form>

        {/* Weather Result Box */}
        <div className="mt-8 text-white">
          {allDetail && allDetail.cod === 200 ? (
            <div className="bg-slate-700 p-4 rounded-xl shadow-lg w-80 mx-auto">
              <h2 className="text-xl font-semibold mb-2">
                {allDetail.name}, {allDetail.sys.country}
              </h2>
              <p>Temperature: {(allDetail.main.temp - 273.15).toFixed(1)}°C</p>
              <p>Weather: {allDetail.weather[0].description}</p>
              <p>Humidity: {allDetail.main.humidity}%</p>
              <p>Wind Speed: {allDetail.wind.speed} m/s</p>
              <p>
                Longitude: {allDetail.coord.lon} Latitude: {allDetail.coord.lat}
              </p>
              
            </div>
            
          ) : allDetail && allDetail.cod === '404' ? (
            <p className="text-red-400 font-medium">No data found</p>
          ) : (
            <p className="text-gray-300">No data found</p>
          )}
        </div>
        
      </div>
       

    </div>
  );
}

export default App;
