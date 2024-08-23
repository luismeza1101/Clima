import axios from "axios";
import { CitysSecondary, ComponentsCity, Weather } from "../types";


const API_KEY= process.env.NEXT_PUBLIC_API_KEY
const API_KEY_WEATHER = process.env.NEXT_PUBLIC_API_KEY_WEATHER;

export const getCoords = (): Promise<{ latitud: number; longitud: number }> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error.message);
          reject(error);
        }
      );
    } else {
      console.error("La Geolocation API no está soportada en este navegador.");
      reject(new Error("Geolocation API no soportada"));
    }
  });
};


export const getCurrentCity = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: `${lat}+${lon}`,
          key: API_KEY,
        },
      }
    );
    
    return response.data.results[0].components.suburb
  } catch (error) {
    console.log("Error al obtener la ciudad");
  }
};

export const getWeatherCity = async (city: string) => {
  let weather: Weather = {country: '',icon: '', temp_c: 0, text: ''}
  const cityFormat = city.normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/ñ/g, 'ñ'); 

  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
      params: {
        key: API_KEY_WEATHER,
        q: cityFormat,
      }
    })
    weather.country = response.data.location.country
    weather.icon = `https:${response.data.current.condition.icon}`
    weather.temp_c = response.data.current.temp_c
    weather.text = response.data.current.condition.text
    return weather
  } catch (error) {
    alert('Esa ciudad no existe')
    throw new Error('Error al obtener informacion')
  }
}

export const addCity = async (city: string, id: number) => {
  const weather = await getWeatherCity(city)
  const dataCity = {...weather, city: city, id: id}
  return dataCity
}

export const saveLocalStorageComponents = (items: ComponentsCity[]) => {
  localStorage.setItem('component', JSON.stringify(items))
}
export const saveLocalStorageCity = (items: CitysSecondary[]) => {
  localStorage.setItem('city', JSON.stringify(items))
}