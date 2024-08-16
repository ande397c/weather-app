export const convertEpochToTime = (epoch: number, includeMinutes: boolean) => {
 const convertedTime = new Date(epoch * 1000);

 const options: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  hour12: false,
  ...(includeMinutes && { minute: "2-digit" }),
 };

 const time = convertedTime.toLocaleTimeString("en-US", options);
 const currentTime = new Date().toLocaleTimeString("en-US", options);

 if (time === currentTime) {
  return "Now";
 }

 return time;
};
