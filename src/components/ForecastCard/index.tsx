import { Link } from "react-router-dom";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ForecastCardProps {
 location: string;
 temperature: number;
 desc: string;
 editModeEnabled: boolean;
}

export const ForecastCard = ({ location, temperature, desc, editModeEnabled }: ForecastCardProps) => {
 const CardContent = (
  <>
   {editModeEnabled && (
    <div className="rounded-full bg-red-500 size-5 flex justify-center items-center">
     <FontAwesomeIcon icon={faMinus} size="xs" />
    </div>
   )}
   <div className="w-full px-3 p-2 bg-slate-900 rounded-xl my-3">
    <div className={`flex justify-between ${editModeEnabled ? "h-10" : "h-14"}`}>
     <h2 className="font-semibold text-lg">{location}</h2>
     <h2 className="text-3xl font-">{temperature}°</h2>
    </div>
    {!editModeEnabled && <p className="text-sm">{desc}</p>}
   </div>
  </>
 );

 return editModeEnabled ? (
  <div className="flex items-center gap-3">{CardContent}</div>
 ) : (
  <Link className="flex items-center gap-3" to={`/weather/${location}`}>
   {CardContent}
  </Link>
 );
};
