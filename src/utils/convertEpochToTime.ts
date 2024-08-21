export const convertEpochToTime = (epoch: number, includeMinutes: boolean = false, showNow: boolean = true) => {
 const convertedTime = new Date(epoch * 1000);

 const options: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  hour12: false,
  ...(includeMinutes && { minute: "2-digit" }),
 };

 const time = convertedTime.toLocaleTimeString("en-US", options);
 const currentTime = new Date().toLocaleTimeString("en-US", options);

 if (time === currentTime && showNow) {
  return "Now";
 }

 return time;
};
