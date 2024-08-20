import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;

export const getCoordinates = async (location: string | undefined) => {
 try {
  const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
   params: {
    q: location,
    limit: 1,
    appid: api_key,
   },
  });

  if (response.data && response.data.length > 0) {
   const { lat, lon } = response.data[0];
   return { lat, lon };
  } else {
   throw new Error("Location not found");
  }
 } catch (error) {
  console.error("Error fetching coordinates:", error);
  throw error;
 }
};

export const getWeatherData = async (lat: number, lon: number) => {
 try {
  const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
   params: {
    lat: lat,
    lon: lon,
    units: "metric",
    exclude: "minutely",
    appid: api_key,
   },
  });

  return response.data;
 } catch (error) {
  console.error("Error fetching weather data:", error);
  throw error;
 }
};
