"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { CitysSecondary, ComponentsCity } from "../types";

interface ContextType {
  citysSecondary: CitysSecondary[];
  setCitysSecondary: (citys: CitysSecondary[]) => void;
  componentsCity: ComponentsCity[];
  setComponentsCity: (component: ComponentsCity[]) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  modalDelete: boolean
  setModalDelete: (open: boolean) => void
}

export const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [citysSecondary, setCitysSecondary] = useState<CitysSecondary[]>([
    { city: "", country: '', icon: "", id: 0, temp_c: 0, text: "" },
    { city: "", country: '', icon: "", id: 0, temp_c: 0, text: "" },
    { city: "", country: '', icon: "", id: 0, temp_c: 0, text: "" },
    { city: "", country: '', icon: "", id: 0, temp_c: 0, text: "" },
  ]);
  const [componentsCity, setComponentsCity] = useState<ComponentsCity[]>([
    "AddCard",
    "AddCard",
    "AddCard",
    "AddCard",
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false)

  const contextValue = useMemo(
    () => ({
      citysSecondary,
      setCitysSecondary,
      componentsCity,
      setComponentsCity,
      modalOpen,
      setModalOpen,
      modalDelete,
      setModalDelete
    }),
    [citysSecondary, componentsCity, modalOpen, modalDelete]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useMyContext = (): ContextType => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
