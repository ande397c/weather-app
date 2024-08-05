import { useState } from "react";
import { MainLayout } from "./layout/MainLayout";
import { ForecastCard } from "./components/ForecastCard";
import { Input } from "./components/Input";
import { faPencil, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cardData } from "./data/cardData";
import { useNavigate } from "react-router-dom";

const App = () => {
 const navigate = useNavigate();
 const [city, setCity] = useState<string>("");
 const [editingMode, setEditingMode] = useState(false);

 const search = () => {
  navigate(`/weather/${city}`);
 };
 return (
  <MainLayout>
   <div className="sticky top-0 bg-black py-2">
    <div className="flex justify-end mb-4 w-full">
     {editingMode ? (
      <button onClick={() => setEditingMode((prev) => !prev)}>OK</button>
     ) : (
      <div onClick={()=>{setEditingMode(true)}} className="rounded-full border border-white size-7 flex justify-center items-center">
       <FontAwesomeIcon icon={faPencil} size="sm" />
      </div>
     )}
    </div>
    <h3 className="text-2xl font-semibold mb-2">Weather</h3>
    <Input
     startIcon={faSearch}
     placeholder="Search after city"
     onChange={(e) => {
      setCity(e.target.value);
     }}
    />
    {city.length > 0 && (
     <button onClick={search} className="m-2 w-full">
      Search
     </button>
    )}
   </div>
   {cardData.map((forecast, i) => (
    <ForecastCard key={i} location={forecast.location} temperature={forecast.temperature} desc={forecast.desc} editModeEnabled={editingMode} />
   ))}
  </MainLayout>
 );
};

export default App;
