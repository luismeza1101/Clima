import React from "react";
import { CitysSecondary } from "../types";
import { useMyContext } from "../context/Contexto";
import Image from "next/image";

interface Props {
  dataCity: CitysSecondary;
  setIndexCurrent: (id: number) => void;
  id: number;
}

const CardClima: React.FC<Props> = React.memo(
  ({ dataCity, setIndexCurrent, id }) => {
    const { setModalDelete } = useMyContext();

    const deleteCitySecondary = () => {
      setIndexCurrent(id);
      setModalDelete(true);
    };

    return (
      <div
        className="bg-colorCard bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-lg flex flex-col items-center justify-center py-2 cursor-pointer"
        onClick={deleteCitySecondary}
      >
        <h3 className="text-lg">{dataCity.city}, {dataCity.country}</h3>
        <Image src={dataCity.icon} alt="Icono" width={100} height={100} className="w-3/4"/>
        <span className="text-4xl font-bold">{dataCity.temp_c}°</span>
        <p>{dataCity.text}</p>
      </div>
    );
  }
);
CardClima.displayName = 'CardClima';
export default CardClima;
