"use client";
import { Dispatch, ReactNode, SetStateAction, useState, createContext } from "react";
import { FormElementInstance } from "../FormElements"

type DesignerContextType = {
    elements: FormElementInstance[];
    setElements: Dispatch<SetStateAction<FormElementInstance[]>>;

    selectedElement: FormElementInstance | null;
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;

    updateElement: (id: string, element: FormElementInstance) => void;
}
export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {
    const [elements, setElements] = useState<FormElementInstance[]>([]);

    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);
    const updateElement = (id: string, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            const index = newElements.findIndex((el) => el.id === id);
            newElements[index] = element;
            return newElements;
        });
    }

    return (
        <DesignerContext.Provider
            value={{
                elements,
                setElements,

                selectedElement,
                setSelectedElement,

                updateElement
            }}
        >
            {children}
        </DesignerContext.Provider>
    )
}