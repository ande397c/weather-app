import { useEffect, useState } from "react";
import { MainLayout } from "./layout/MainLayout";
import { ForecastCard } from "./components/ForecastCard";
import { Input } from "./components/Input";
import { faCircleExclamation, faPencil, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { AddedCity } from "./types/addedCity";
import { getStorageCities, removeCityFromStorage } from "./utils/LocalStorage";
import { getCoordinates, getWeatherData } from "./services/weatherServices";

const App = () => {
 const navigate = useNavigate();
 const [city, setCity] = useState<string>("");
 const [cities, setCities] = useState<AddedCity[]>([]);
 const [editingMode, setEditingMode] = useState(false);
 const [errorOccured, setErrorOccured] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 const search = () => {
  navigate(`/weather/${city}`);
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
    <div className="flex justify-end mb-4 w-full">
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
    {isLoading && <h2 className="text-center">Is loading..</h2>}
    {city.length > 0 && (
     <button onClick={search} className="mt-2 w-full h-8">
      Search
     </button>
    )}
   </div>
   {errorOccured ? (
    <div className="mt-10">
     <h2 className="text-2xl text-white text-center">An error occured</h2>
     <div className="flex justify-center mt-4 mb-2">
      <FontAwesomeIcon icon={faCircleExclamation} size="3x" />
     </div>
     <p className="text-center text-gray-500">Please try again</p>
    </div>
   ) : (
    cities.map((forecast, i) => <ForecastCard key={i} location={forecast.location} timeZone={forecast.timeZone} temperature={forecast.temperature} desc={forecast.desc} Dt={forecast.Dt} HighTemp={forecast.HighTemp} LowTemp={forecast.LowTemp} editModeEnabled={editingMode} onClick={() => removeCity(forecast.location)} />)
   )}
  </MainLayout>
 );
};

export default App;
