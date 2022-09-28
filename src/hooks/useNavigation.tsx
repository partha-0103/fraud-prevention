import create from "zustand";

const useNavigationStore = create((set) => ({
  show: false,
  setShowNavigation: (showNavigation: boolean) =>
    set((state: { show: boolean }) => ({ show: showNavigation })),
}));

export default useNavigationStore;
