import create from "zustand";

const useNavigationStore = create((set) => ({
  show: false,
  loading: true,
  setShowNavigation: (showNavigation: boolean) =>
    set((state: { show: boolean }) => ({ show: showNavigation })),
  setLoading: (loading: boolean) =>
    set((state: { show: boolean }) => ({ show: loading })),
}));

export default useNavigationStore;
