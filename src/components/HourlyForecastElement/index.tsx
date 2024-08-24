import { convertEpochToTime } from "../../utils/convertEpochToTime";

interface HourlyForecastElementProps {
epoch: number;
timezone: string;
weatherIcon: string;
weatherDesc: string;
temp: number;
}

export const HourlyForecastElement = ({epoch, timezone, weatherIcon, weatherDesc, temp}: HourlyForecastElementProps) => {
 return (
  <div className={`flex flex-col items-center`}>
   <p className="">{convertEpochToTime(epoch, false, true, timezone)}</p>
   <div className="size-9">
    <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherDesc} />
   </div>
   <p className="">{Math.round(temp)}°</p>
  </div>
 );
};