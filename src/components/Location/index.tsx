import { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { DetailBlock } from "../DetailBlock";
import { useParams, useNavigate } from "react-router-dom";
import {getCoordinates, getWeatherData } from "../../services/weatherServices"
import { WeatherLocation } from "../../types/weatherLocation";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { convertEpochToDate } from "../../utils/convertEpochToDate";
import { convertEpochToTime } from "../../utils/convertEpochToTime";
import { addCityToStorage, getStorageCities } from "../../utils/LocalStorage";
import { faCalendarDays, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Location = () => {
 const navigate = useNavigate();
 const { location } = useParams<{ location: string }>();
 const [weatherData, setWeatherData] = useState<WeatherLocation>();
 const [isCityAdded, setIsCityAdded] = useState(getStorageCities().includes(location));
 const [errorOccured, setErrorOccured] = useState(false);

 useEffect(() => {
  fetchWeather();
 }, []);

 const fetchWeather = async () => {
  try {
   const { lat, lon } = await getCoordinates(location);
   const weather = await getWeatherData(lat, lon);
   setWeatherData(weather);
  } catch (error) {
   setErrorOccured(true)
  }
 };


 const addCity = () => {
  addCityToStorage(location);
  setIsCityAdded(true)
 };

 return (
  <MainLayout showError={errorOccured}>
   {!isCityAdded && (
    <div className="flex justify-between">
     <p onClick={() => navigate("/")}>Cancel</p>
     <p className="font-semibold" onClick={addCity}>
      Add
     </p>
    </div>
   )}
   <div className="flex flex-col items-center mt-9">
    <h1 className="text-xl">{location && capitalizeFirstLetter(location)}</h1>
    <h3 className="font-light text-5xl pb-1">{weatherData && weatherData.current.temp.toFixed()}°</h3>
    <p>{weatherData && capitalizeFirstLetter(weatherData.current.weather[0].description)}</p>
    <p className="flex gap-3">
     <span>H: {weatherData && Math.round(weatherData.daily[0].temp.max)}°</span>
     <span>L: {weatherData && Math.round(weatherData.daily[0].temp.min)}°</span>
    </p>
   </div>
   <DetailBlock>
    <p className="border-b border-teal-600 pb-1">{weatherData && weatherData.daily[0].summary}</p>
    <div className="flex justify-between overflow-x-auto gap-1 pt-1 w-[99%]">
     {weatherData &&
      weatherData.hourly.map((hour, i) => (
       <div key={i} className={`flex flex-col items-center`}>
        <p className="">{convertEpochToTime(hour.dt, false)}</p>
        <div className="size-9">
         <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt={hour.weather[0].main} />
        </div>
        <p className="">{Math.round(hour.temp)}°</p>
       </div>
      ))}
    </div>
   </DetailBlock>

   <DetailBlock>
    <p className="border-b border-teal-600 pb-1">
     <FontAwesomeIcon icon={faCalendarDays} size="xs" /> Forecast for the next {weatherData && weatherData.daily.length} days
    </p>
    {weatherData &&
     weatherData.daily.map((day, i, { length }) => (
      <div key={i} className={`flex items-center justify-between ${length - 1 !== i && "border-b border-teal-600 py-1"} `}>
       <p className="w-7">{convertEpochToDate(day.dt)}</p>
       <div className="size-10">
        <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].main} />
       </div>
       <p className="text-gray-400">L:{Math.round(day.temp.min)}°</p>
       <p className="text-white">H:{Math.round(day.temp.max)}°</p>
      </div>
     ))}
   </DetailBlock>

   <div className="grid grid-cols-2 gap-2">
    <DetailBlock>
     <p>
      <FontAwesomeIcon icon={faSun} size="xs" /> UV-INDEX
     </p>
     <div className="flex justify-center items-center h-[70%]">
      <h2 className="text-3xl text-center">{weatherData && Math.round(weatherData.daily[0].uvi)}</h2>
     </div>
    </DetailBlock>
    <DetailBlock>
     <p>
      <FontAwesomeIcon icon={faCalendarDays} size="xs" /> SUNSET
     </p>
     <h2 className="text-3xl text-center leading-10">{weatherData && convertEpochToTime(weatherData.current.sunset, true)}</h2>
     <p>
      Sun up: <span>{weatherData && convertEpochToTime(weatherData.current.sunrise, true)}</span>
     </p>
    </DetailBlock>
   </div>
  </MainLayout>
 );
};
