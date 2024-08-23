import { useRef, useState } from "react";
import { addCity, saveLocalStorageCity, saveLocalStorageComponents } from "../hooks/funtions";
import { CitysSecondary } from "../types";
import { useMyContext } from "../context/Contexto";

interface Props {
    id: number
}

const ModalAddCity: React.FC<Props> = ({id}) => {

  const {setCitysSecondary, setComponentsCity, citysSecondary, componentsCity, setModalOpen} = useMyContext()
  const cityInput = useRef<HTMLInputElement>(null);

  

  const handleCity = async () => {
    const city = cityInput.current?.value
    if(!city){
      alert('Debes completar el espacio en blanco')
    } else {
      const cityFormat = city!.charAt(0).toUpperCase() + city!.slice(1).toLowerCase();
      const dataCity: CitysSecondary = await addCity(cityFormat, id);
      const newCitySecondary = citysSecondary
      newCitySecondary[id] = dataCity 
      setCitysSecondary(newCitySecondary);
      saveLocalStorageCity(newCitySecondary)
      const newComponents = [...componentsCity]
      newComponents[id] = 'CardClima'
      setComponentsCity(newComponents)
      saveLocalStorageComponents(newComponents)
      setModalOpen(false)
    }
  };

    return (
    <div className="fixed inset-0 z-50 bg-black-clear w-full h-screen top-0 flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCity();
        }}
        className="flex flex-col gap-4 bg-[#1f2937] py-8 px-10 rounded-lg shadow-lg relative"
      >
        <label htmlFor="inputCity">Enter the name of the city :</label>
        <input
          type="text"
          id="inputCity"
          className="rounded-lg text-black py-1 px-2 outline-none"
          ref={cityInput}
        />
        <button
          type="submit"
          className="border-2 rounded-xl mx-auto px-4 py-1 cursor-pointer hover:bg-gray-900"
        >
          Aceptar
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="absolute top-3 right-3 cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </form>
    </div>
  );
}

export default ModalAddCity









