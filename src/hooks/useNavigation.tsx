import create from "zustand";

const useNavigationStore = create((set) => ({
  show: false,
  increasePopulation: () =>
    set((state: { show: boolean }) => ({ show: !state.show })),
}));

export default useNavigationStore;
