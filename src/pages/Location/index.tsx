import { useEffect, useState } from 'react';
import { MainLayout } from '../../layout/MainLayout';
import { DetailBlock } from '../../components/DetailBlock';
import { Compass } from '../../components/Compass';
import { DailyForecastList } from '../../components/lists/DailyForecastList';
import { HourlyForecastList } from '../../components/lists/HourlyForecastList';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useParams, useNavigate } from 'react-router-dom';
import { getCoordinates, getWeatherData } from '../../services/weatherServices';
import { WeatherLocation } from '../../types/weatherLocation';
import { AppStates } from '../../types/appStates';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { convertEpochToTime } from '../../utils/convertEpochToTime';
import { renderUVIndexText } from '../../utils/renderUVIndexText';
import { addCityToStorage, getStorageCities } from '../../utils/LocalStorage';
import {
  faCalendarDays,
  faSun,
  faWind,
  faEye,
  faTemperatureQuarter,
  faWater,
  faCompress,
  faStar
} from '@fortawesome/free-solid-svg-icons';

export const Location = () => {
  const navigate = useNavigate();
  const { location } = useParams<{ location: string }>();
  const [weatherData, setWeatherData] = useState<WeatherLocation>();
  const [appState, setAppState] = useState<AppStates>('Loading');
  
  const [isCityAdded, setIsCityAdded] = useState(
    getStorageCities().includes(location)
  );

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const { lat, lon } = await getCoordinates(location);
      const weather = await getWeatherData(lat, lon);
      setWeatherData(weather);
    } catch (error) {
      setAppState('errorOccured')
      return
    }
    setAppState('Done')
  };

  const addCity = () => {
    addCityToStorage(location);
    setIsCityAdded(true);
  };

  return (
    <MainLayout showError={appState === 'errorOccured'} showFooter>
      {!isCityAdded && (
        <div className="flex justify-between">
          <p onClick={() => navigate('/')}>Cancel</p>
          <p className="font-semibold" onClick={addCity}>
            Add
          </p>
        </div>
      )}
      <div className="flex flex-col items-center mt-9">
        <h1 className="text-2xl">
          {location && capitalizeFirstLetter(location)}
        </h1>
        <h3 className="font-light text-6xl pb-1">
          {weatherData && weatherData.current.temp.toFixed()}°
        </h3>
        <p>
          {weatherData &&
            capitalizeFirstLetter(weatherData.current.weather[0].description)}
        </p>
        <p className="flex gap-3">
          <span>
            H: {weatherData && Math.round(weatherData.daily[0].temp.max)}°
          </span>
          <span>
            L: {weatherData && Math.round(weatherData.daily[0].temp.min)}°
          </span>
        </p>
      </div>
      <DetailBlock
        text={weatherData && weatherData.daily[0].summary}
        includeBorder
      >
        <div className="flex justify-between overflow-x-auto gap-2 pt-1 w-[99%]">
          <HourlyForecastList weatherData={weatherData && weatherData} />
        </div>
      </DetailBlock>

      <DetailBlock
        text={`Forecast for the next ${
          weatherData && weatherData.daily.length
        } days`}
        icon={faCalendarDays}
        includeBorder
      >
        <DailyForecastList weatherData={weatherData && weatherData} />
      </DetailBlock>

      <div className="grid grid-cols-2 gap-2">
        <DetailBlock text="UV-INDEX" icon={faSun}>
          <h2 className="text-4xl text-center leading-10">
            {weatherData && Math.round(weatherData.daily[0].uvi)}
          </h2>
          <p>
            {renderUVIndexText(
              weatherData && Math.round(weatherData.daily[0].uvi)
            )}
          </p>
        </DetailBlock>
        <DetailBlock text="SUNSET" icon={faStar}>
          <h2 className="text-3xl text-center leading-10">
            {weatherData &&
              convertEpochToTime(
                weatherData.current.sunset,
                true,
                false,
                weatherData.timezone
              )}
          </h2>
          <p>
            Sunrise:
            <span>
              {weatherData &&
                convertEpochToTime(
                  weatherData.current.sunrise,
                  true,
                  false,
                  weatherData.timezone
                )}
            </span>
          </p>
        </DetailBlock>
      </div>

      <DetailBlock text="Wind" icon={faWind}>
        <div className="grid grid-cols-[65%_35%] items-center px-8">
          <div className="flex flex-col">
            <div className="flex gap-2">
              {/* border-b border-white */}
              <h2 className="text-5xl">
                {weatherData && Math.round(weatherData.current.wind_speed)}
              </h2>
              <div>
                <p>m/s</p>
                <p>Wind</p>
              </div>
            </div>
            {/* <div>
       <h2 className="text-4xl">{weatherData && weatherData.current.wind_gust}</h2>
       <div>
        <p>m/s</p>
        <p>Wind Guts</p>
       </div>
      </div> */}
          </div>
          <Compass
            windDirection={weatherData && weatherData.current.wind_deg}
          />
        </div>
      </DetailBlock>

      <div className="grid grid-cols-2 gap-2">
        <DetailBlock text="Feels like" icon={faTemperatureQuarter}>
          <div className="flex justify-center items-center h-[70%]">
            <h2 className="text-4xl text-center">
              {weatherData && Math.round(weatherData.current.feels_like)}°
            </h2>
          </div>
        </DetailBlock>
        <DetailBlock text="Humidity" icon={faWater}>
          <h2 className="text-3xl text-center leading-10">
            {weatherData && weatherData.current.humidity}%
          </h2>
        </DetailBlock>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <DetailBlock text="Visibility" icon={faEye}>
          <div className="flex justify-center items-center h-[70%]">
            <h2 className="text-4xl text-center">
              {weatherData && weatherData.current.visibility / 1000} km
            </h2>
          </div>
        </DetailBlock>
        <DetailBlock text="Air pressure" icon={faCompress}>
          <h2 className="text-3xl text-center leading-10">
            {weatherData && weatherData.current.pressure} hPa
          </h2>
        </DetailBlock>
      </div>
    </MainLayout>
  );
};
