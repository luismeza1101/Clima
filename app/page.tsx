"use client";

import Image from "next/image";
import CardClima from "./components/CardClima";
import AddCard from "./components/AddCard";
import ModalAddCity from "./components/ModalAddCity";
import { useEffect, useState } from "react";
import { getCoords, getCurrentCity, getWeatherCity } from "./hooks/funtions";
import { City, defaultWeather, Weather } from "./types";
import { useMyContext } from "./context/Contexto";
import ModalDeleteCard from "./components/ModalDeleteCard";
import Loader from "./components/Loader";

export default function Home() {
  const [currentCity, setCurrentCity] = useState<City>("Ciudad");
  const [currentWeather, setCurrentWeather] = useState<Weather>(defaultWeather);
  const [indexCurrent, setIndexCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  const { componentsCity, citysSecondary, modalOpen, modalDelete, setComponentsCity, setCitysSecondary} = useMyContext();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const coords = await getCoords();
        const city = await getCurrentCity(coords.latitud, coords.longitud);
        const weather = await getWeatherCity(city);
        setCurrentCity(city);
        setCurrentWeather(weather);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false)
      }
    };

    const getDataLocalStorage = () => {
      const storedComponents = localStorage.getItem('component')
      const storedCitys = localStorage.getItem('city')

      if(storedComponents){
        setComponentsCity(JSON.parse(storedComponents))
      }

      if(storedCitys){
        setCitysSecondary(JSON.parse(storedCitys))
      }
    }
  
    fetchWeatherData();
    getDataLocalStorage();
  }, [setCitysSecondary, setComponentsCity]);

  if(loading) {
    return <Loader/>
  }
  
  return (
    <>
      <h1 className="font-bold text-4xl text-center my-7">
        The Weather 
      </h1>
      <main className="w-9/12 min-h-[346px] mx-auto bg-colorCard bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-lg flex flex-col items-center justify-between md:w-[40%]">
        <h3 className="text-2xl">{currentCity}</h3>
        <Image src={currentWeather.icon} alt="Icono" width={100} height={100} className="w-1/2 max-w-[200px] max-h-[200px]"/>
        <span className="text-5xl font-semibold">{`${currentWeather?.temp_c}°`}</span>
        <p className="text-xl">{currentWeather?.text}</p>
      </main>
      <section className="w-[90%] mx-auto text-center my-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Other places</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {componentsCity.map((comoponent, index) =>
            comoponent == "AddCard" ? (
              <AddCard key={index} id={index} setIndexCurrent={setIndexCurrent}/>
            ) : (
              <CardClima dataCity={citysSecondary[index]} key={index} setIndexCurrent={setIndexCurrent} id={index}/>
            )
          )}
        </div>
      </section>
      {modalOpen && <ModalAddCity id={indexCurrent}/>}
      {modalDelete && <ModalDeleteCard id={indexCurrent}/>}
    </>
  );
}
