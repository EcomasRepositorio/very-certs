import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CounterState {
  validatedCount: number; // Contador actual
  incrementCount: (value: number) => void; // Incrementar el contador
}

const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      validatedCount: 1200, // Valor inicial
      incrementCount: (value: number) =>
        set((state) => ({
          validatedCount: state.validatedCount + value,
        })),
    }),
    {
      name: "validated-counter", // Nombre para almacenamiento persistente
    }
  )
);

export default useCounterStore;
