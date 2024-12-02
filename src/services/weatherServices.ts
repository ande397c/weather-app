import axios from 'axios';

const api_key = import.meta.env.VITE_API_KEY;

const BASE_URL = 'https://api.openweathermap.org';

export const getCoordinates = async (
  location: string | undefined,
  limit: number = 1
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/geo/1.0/direct`,
      {
        params: {
          q: location,
          limit: limit,
          appid: api_key
        }
      }
    );

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

export const getWeatherData = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/data/3.0/onecall`,
      {
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
          exclude: 'minutely',
          appid: api_key
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
