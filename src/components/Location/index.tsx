import { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { DetailBlock } from "../DetailBlock";
import { HourlyForecastElement } from "../HourlyForecastElement";
import { DailyForecastElement } from "../DailyForecastElement";
import { useParams, useNavigate } from "react-router-dom";
import { getCoordinates, getWeatherData } from "../../services/weatherServices";
import { WeatherLocation } from "../../types/weatherLocation";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { convertEpochToTime } from "../../utils/convertEpochToTime";
import { renderUVIndexText } from "../../utils/renderUVIndexText";
import { addCityToStorage, getStorageCities } from "../../utils/LocalStorage";
import { faCalendarDays, faSun } from "@fortawesome/free-solid-svg-icons";

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
   console.log(weatherData);
  } catch (error) {
   setErrorOccured(true);
  }
 };
 const addCity = () => {
  addCityToStorage(location);
  setIsCityAdded(true);
 };

 return (
  <MainLayout showError={errorOccured} showFooter>
   {!isCityAdded && (
    <div className="flex justify-between">
     <p onClick={() => navigate("/")}>Cancel</p>
     <p className="font-semibold" onClick={addCity}>
      Add
     </p>
    </div>
   )}
   <div className="flex flex-col items-center mt-9">
    <h1 className="text-2xl">{location && capitalizeFirstLetter(location)}</h1>
    <h3 className="font-light text-6xl pb-1">{weatherData && weatherData.current.temp.toFixed()}°</h3>
    <p>{weatherData && capitalizeFirstLetter(weatherData.current.weather[0].description)}</p>
    <p className="flex gap-3">
     <span>H: {weatherData && Math.round(weatherData.daily[0].temp.max)}°</span>
     <span>L: {weatherData && Math.round(weatherData.daily[0].temp.min)}°</span>
    </p>
   </div>
   <DetailBlock text={weatherData && weatherData.daily[0].summary} includeBorder>
    <div className="flex justify-between overflow-x-auto gap-2 pt-1 w-[99%]">{weatherData && weatherData.hourly.map((hour, i) => <HourlyForecastElement key={i} epoch={hour.dt} timezone={weatherData.timezone} weatherIcon={hour.weather[0].icon} weatherDesc={hour.weather[0].main} temp={hour.temp} />)}</div>
   </DetailBlock>

   <DetailBlock text={`Forecast for the next ${weatherData && weatherData.daily.length} days`} icon={faCalendarDays} includeBorder>
    {weatherData && weatherData.daily.map((day, i, { length }) => <DailyForecastElement key={i} len={length} i={i} epoch={day.dt} weatherIcon={day.weather[0].icon} weatherDesc={day.weather[0].main} tempLow={day.temp.min} tempHigh={day.temp.max} />)}
   </DetailBlock>

   <div className="grid grid-cols-2 gap-2">
    <DetailBlock text="UV-INDEX" icon={faSun}>
     <h2 className="text-4xl text-center leading-10">{weatherData && Math.round(weatherData.daily[0].uvi)}</h2>
     <p>{renderUVIndexText(weatherData && Math.round(weatherData.daily[0].uvi))}</p>
    </DetailBlock>
    <DetailBlock text="SUNSET" icon={faCalendarDays}>
     <h2 className="text-3xl text-center leading-10">{weatherData && convertEpochToTime(weatherData.current.sunset, true, false, weatherData.timezone)}</h2>
     <p>
      Sun up: <span>{weatherData && convertEpochToTime(weatherData.current.sunrise, true, false, weatherData.timezone)}</span>
     </p>
    </DetailBlock>
   </div>

   <div className="grid grid-cols-2 gap-2">
    <DetailBlock text="Feels like" icon={faSun}>
     <div className="flex justify-center items-center h-[70%]">
      <h2 className="text-4xl text-center">{weatherData && Math.round(weatherData.current.feels_like)}°</h2>
     </div>
    </DetailBlock>
    <DetailBlock text="Humidity" icon={faCalendarDays}>
     <h2 className="text-3xl text-center leading-10">{weatherData && weatherData.current.humidity}%</h2>
    </DetailBlock>
   </div>
   <div className="grid grid-cols-2 gap-2">
    <DetailBlock text="Visibility" icon={faSun}>
     <div className="flex justify-center items-center h-[70%]">
      <h2 className="text-4xl text-center">{weatherData && weatherData.current.visibility / 1000} km</h2>
     </div>
    </DetailBlock>
    <DetailBlock text="Air pressure" icon={faCalendarDays}>
     <h2 className="text-3xl text-center leading-10">{weatherData && weatherData.current.pressure} hPa</h2>
    </DetailBlock>
   </div>
  </MainLayout>
 );
};
