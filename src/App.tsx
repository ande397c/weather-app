import { useEffect, useState } from "react";
import { MainLayout } from "./layout/MainLayout";
import { ForecastCard } from "./components/ForecastCard";
import { Input } from "./components/Input";
import { faCircleExclamation, faPencil, faSearch, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { AddedCity } from "./types/addedCity";
import { getStorageCities, removeCityFromStorage } from "./utils/LocalStorage";
import { capitalizeFirstLetter } from "./utils/capitalizeFirstLetter";
import { getCoordinates, getWeatherData } from "./services/weatherServices";

const App = () => {
 const navigate = useNavigate();
 const [city, setCity] = useState<string>("");
 const [cities, setCities] = useState<AddedCity[]>([]);
 const [editingMode, setEditingMode] = useState(false);
 const [errorOccured, setErrorOccured] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 const search = () => {
  navigate(`/weather/${capitalizeFirstLetter(city)}`);
 };

 useEffect(() => {
  fetchWeather();
 }, []);

 const fetchWeather = async () => {
  setIsLoading(true);
  try {
   const cities = getStorageCities();

   const updatedCities: AddedCity[] = [];

   for (const city of cities) {
    const { lat, lon } = await getCoordinates(city);
    const weatherData = await getWeatherData(lat, lon);

    const updatedCity: AddedCity = {
     location: city,
     timeZone: weatherData.timezone,
     temperature: weatherData.current.temp,
     desc: weatherData.current.weather[0].description,
     Dt: weatherData.current.dt,
     HighTemp: weatherData.daily[0].temp.max,
     LowTemp: weatherData.daily[0].temp.min,
     editModeEnabled: false,
    };

    updatedCities.push(updatedCity);
   }
   setCities(updatedCities);
  } catch (error) {
   setErrorOccured(true);
  } finally {
   setIsLoading(false);
  }
 };

 const removeCity = (location: string) => {
  removeCityFromStorage(location);
  const updatedCityList = cities.filter((city) => city.location !== location);
  setCities(updatedCityList);
 };

 return (
  <MainLayout>
   <div className="sticky top-0 bg-black py-2">
    <div className="flex justify-end mb-4 w-full min-h-10">
     {editingMode ? (
      <button onClick={() => setEditingMode((prev) => !prev)}>OK</button>
     ) : (
      <div
       onClick={() => {
        setEditingMode(true);
       }}
       className="rounded-full border border-white size-7 flex justify-center items-center"
      >
       <FontAwesomeIcon icon={faPencil} size="sm" />
      </div>
     )}
    </div>
    <h3 className="text-2xl font-semibold mb-2">Weather</h3>
    <Input
     startIcon={faSearch}
     placeholder="Search after city"
     onSubmit={search}
     onChange={(e) => {
      setCity(e.target.value);
     }}
    />
    {isLoading && <h2 className="text-center mt-4">Loading...</h2>}
    {city.length > 0 && (
     <button onClick={search} className="mt-2 w-full min-h-8">
      Search for weather in <span className="font-semibold text-blue">{capitalizeFirstLetter(city)}</span>
     </button>
    )}
   </div>
   <section className="h-frontpage-height overflow-y-auto">
    {cities.length == 0 && !isLoading && !errorOccured && (
     <div className="mt-10">
      <h2 className="text-2xl text-white text-center">No cities added</h2>
      <div className="flex justify-center mt-4 mb-2">
       <FontAwesomeIcon icon={faLocationDot} size="3x" />
      </div>
      <p className="text-center text-lightGrey">Search for a city to add it to your list </p>
     </div>
    )}
    {errorOccured ? (
     <div className="mt-10">
      <h2 className="text-2xl text-white text-center">An error occured</h2>
      <div className="flex justify-center mt-4 mb-2">
       <FontAwesomeIcon icon={faCircleExclamation} size="3x" />
      </div>
      <p className="text-center text-lightGrey">Could not load data. Please try again</p>
     </div>
    ) : (
     cities.map((forecast, i) => <ForecastCard key={i} location={forecast.location} timeZone={forecast.timeZone} temperature={forecast.temperature} desc={forecast.desc} Dt={forecast.Dt} HighTemp={forecast.HighTemp} LowTemp={forecast.LowTemp} editModeEnabled={editingMode} onClick={() => removeCity(forecast.location)} />)
    )}
   </section>
  </MainLayout>
 );
};

export default App;
