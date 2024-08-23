import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;

export const getCitySuggestions = async (city: string) => {
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
