import React from "react";
import { useMyContext } from "../context/Contexto";

interface Props {
  id: number;
  setIndexCurrent: (index: number) => void;
}

const AddCard: React.FC<Props> = React.memo(({ id, setIndexCurrent }) => {
  const { setModalOpen } = useMyContext();

  const handleModal = () => {
    setIndexCurrent(id);
    setModalOpen(true);
  };

  return (
    <div
      className="bg-colorCard bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4 cursor-pointer min-h-[266px]"
      onClick={handleModal}
    >
      <h3 className="text-lg">Add City</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </svg>
    </div>
  );
});
AddCard.displayName = 'AddCard';
export default AddCard;
