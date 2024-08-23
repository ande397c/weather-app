export const convertEpochToTime = (epoch: number, includeMinutes: boolean = false, showNow: boolean = true, timeZone: string = "America/New_York") => {

 const convertedTime = new Date(epoch * 1000);

 const options: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  hour12: false,
  timeZone: timeZone,
  ...(includeMinutes && { minute: "2-digit" }),
 };

 const time = new Intl.DateTimeFormat("en-GB", options).format(convertedTime);

 const currentTime = new Intl.DateTimeFormat("en-GB", options).format(new Date());

 if (time === currentTime && showNow) {
  return "Now";
 }

 return time;
};
