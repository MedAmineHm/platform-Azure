import create from "zustand";
import axios from "axios";

const getLocationsNames = async (set) => {
  try {
    set(() => ({ isLocationsNamesLoading: true }));

    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/azure/locations/names`
    );
    const locationsNames = res.data.data;
    set(() => ({ locationsNames, isLocationsNamesLoading: false }));
  } catch {
    console.error("Can not load locations names!");
    set(() => ({ locationsNames: null, isLocationsNamesLoading: false }));
  }
};

const useAzureLocationsStore = create((set) => ({
  locationsNames: [],
  isLocationsNamesLoading: true,
  loadLocationsNames: () => getLocationsNames(set),
}));

export default useAzureLocationsStore;
