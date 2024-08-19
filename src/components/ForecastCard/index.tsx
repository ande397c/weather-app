import { convertEpochToTime } from "../../utils/convertEpochToTime";
import { Link } from "react-router-dom";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ForecastCardProps {
 location: string;
 temperature: number;
 desc: string;
 Dt: number;
 HighTemp: number;
 LowTemp: number;
 editModeEnabled: boolean;
}

export const ForecastCard = ({ location, temperature, desc, Dt, HighTemp, LowTemp, editModeEnabled }: ForecastCardProps) => {
 const CardContent = (
  <>
   {editModeEnabled && (
    <div className="rounded-full bg-red-500 size-5 flex justify-center items-center">
     <FontAwesomeIcon icon={faMinus} size="xs" />
    </div>
   )}
   <div className="w-full px-3 p-2 bg-slate-900 rounded-xl my-3">
    <div className={`flex justify-between ${editModeEnabled ? "h-12" : "h-16"}`}>
     <div>
      <h2 className="font-semibold text-lg">{location}</h2>
      <p className="font-normal text-base">{convertEpochToTime(Dt, true)}</p>
     </div>
     <h2 className="text-4xl font-">{temperature}°</h2>
    </div>
    {!editModeEnabled && (
     <div className="flex justify-between">
      <p className="text-sm">{desc}</p>
      <p className="text-sm">
       H: <span className="mr-2">{HighTemp}°</span>
       L: <span>{LowTemp}°</span>
      </p>
     </div>
    )} 
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
