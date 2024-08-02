import { Link } from "react-router-dom"
interface ForecastCardProps {
location: string
temperature: number
desc: string
}

export const ForecastCard = ({location, temperature, desc}: ForecastCardProps) => {
 return (
  <Link to={`/weather/${location}`}>
   <div className="w-full px-3 p-2 bg-slate-900 rounded-xl my-3">
    <div className="flex justify-between h-14">
     <h2 className="font-semibold text-lg">{location}</h2>
     <h2 className="text-3xl font-">{temperature}°</h2>
    </div>
    <p className="text-sm">{desc}</p>
   </div>
  </Link>
 );
};
