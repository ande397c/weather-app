import { MainLayout } from "./layout/MainLayout";
import { ForecastCard } from "./components/ForecastCard";
import { Input } from "./components/Input";
import { faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {cardData} from './data/cardData'

const App = () => {
 return (
  <MainLayout>
   <div className="sticky top-0 bg-black py-2">
    <div className="flex justify-end mb-4 w-full">
     <div className="rounded-full border border-white size-6 flex justify-center items-center">
      <FontAwesomeIcon icon={faEllipsis} size="lg" />
     </div>
    </div>
    <h3 className="text-2xl font-semibold mb-2">Weather</h3>
   <Input startIcon={faSearch} placeholder="Search after city" />
   </div>
   {cardData.map((forecast) => (
    <ForecastCard location={forecast.location} temperature={forecast.temperature} desc={forecast.desc} />
   ))}
  </MainLayout>
 );
};

export default App;
