import { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { WeatherLocation } from "../../types/weatherLocation";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { getDate } from "../../utils/getDate";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Location = () => {
 const [coordinates, setCoordinates] = useState({ lat: Number, lon: Number });
 const [weatherData, setWeatherData] = useState<WeatherLocation>();
 const { location } = useParams<{ location: string }>();

 const api_key = import.meta.env.VITE_API_KEY;

 useEffect(() => {
  getCoordinates();
 }, []);

 const getCoordinates = async () => {
  await axios
   .get(`http://api.openweathermap.org/geo/1.0/direct?&limit=1`, {
    params: {
     q: location,
     appid: api_key,
    },
   })
   .then(function (response) {
    const { lat, lon } = response.data[0];
    const roundedLat = lat.toFixed(2);
    const roundedLon = lon.toFixed(2);
    setCoordinates({ lat: roundedLat, lon: roundedLon });
    getWeatherData(lat, lon);
   })
   .catch(function (error) {
    console.log(error);
   });
 };

 const getWeatherData = async (lat: number, lon: number) => {
  await axios
   .get(`https://api.openweathermap.org/data/3.0/onecall`, {
    params: {
     lat: lat,
     lon: lon,
     units: "metric",
     exclude: "minutely",
     appid: api_key,
    },
   })
   .then(function (response) {
    console.log(response);
    setWeatherData(response.data);
   })
   .catch(function (error) {
    console.log(error);
   });
 };

 return (
  <MainLayout showFooter>
   <div className="flex flex-col items-center mt-10">
    <h1 className="text-xl">{location && capitalizeFirstLetter(location)}</h1>
    <h3 className="font-light text-5xl pb-1">{weatherData && weatherData.current.temp.toFixed()}°</h3>
    <p>{weatherData && capitalizeFirstLetter(weatherData.current.weather[0].description)}</p>
    <p className="flex gap-3">
     <span>H: {weatherData && Math.round(weatherData.daily[0].temp.max)}°</span>
     <span>L: {weatherData && Math.round(weatherData.daily[0].temp.min)}°</span>
    </p>
   </div>
   <div className="bg-slate-500 rounded-lg mt-8 p-2">
    <p className="border-b border-teal-600 pb-1">
     <FontAwesomeIcon icon={faCalendarDays} /> Forecast for the next {weatherData && weatherData.daily.length} days
    </p>
    <div className="">
     {weatherData &&
      weatherData.daily.map((day, i, { length }) => (
       <div key={i} className={`flex items-center justify-between ${length - 1 !== i && "border-b border-teal-600 py-1"} `}>
        <p className="w-7">{getDate(day.dt)}</p>
        <div className="size-10">
         <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].main} />
        </div>
        <p className="text-gray-400">L:{Math.round(day.temp.min)}°</p>
        <p className="text-white">H:{Math.round(day.temp.max)}°</p>
       </div>
      ))}
    </div>
   </div>
  </MainLayout>
 );
};
