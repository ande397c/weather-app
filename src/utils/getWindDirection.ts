export const getWindDirection = (windDirection: number): string => {
 if (windDirection >= 0 && windDirection < 22.5) {
  return "N";
 } else if (windDirection >= 22.5 && windDirection < 67.5) {
  return "NE";
 } else if (windDirection >= 67.5 && windDirection < 112.5) {
  return "E";
 } else if (windDirection >= 112.5 && windDirection < 157.5) {
  return "SE";
 } else if (windDirection >= 157.5 && windDirection < 202.5) {
  return "S";
 } else if (windDirection >= 202.5 && windDirection < 247.5) {
  return "SW";
 } else if (windDirection >= 247.5 && windDirection < 292.5) {
  return "W";
 } else if (windDirection >= 292.5 && windDirection < 337.5) {
  return "NW";
 } else if (windDirection >= 337.5 && windDirection < 360) {
  return "N";
 } else {
  return "--";
 }
};
