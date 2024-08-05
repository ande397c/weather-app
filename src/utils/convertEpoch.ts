export const convertEpoch = (epoch: number) => {
 const myDate = new Date(epoch * 1000);
 // Extract only the hour in 24-hour format
 const options: Intl.DateTimeFormatOptions = { hour: "2-digit", hour12: false };
 return myDate.toLocaleTimeString("en-US", options);
};
