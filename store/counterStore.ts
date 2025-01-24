import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CounterState {
  validatedCount: number; // Contador actual
  incrementCount: (value: number) => void; // Incrementar el contador
  setCount: (value: number) => void;
}

const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      validatedCount: 1200, // Valor inicial
      incrementCount: (value: number) =>
        set((state) => ({
          validatedCount: state.validatedCount + value,
        })),
      setCount: (value: number) =>
        set(() => ({
          validatedCount: value, // Establecer un nuevo valor
        })),
    }),
    {
      name: "validated-counter", // Nombre para almacenamiento persistente
    }
  )
);

export default useCounterStore;
