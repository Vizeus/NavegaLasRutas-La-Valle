import { createContext } from "react";

export const CarritoContext = createContext({
    carrito: [],
    montoTotal: 0,
    cantidadTotal: 0
});

