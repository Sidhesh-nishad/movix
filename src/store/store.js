import { create } from "zustand";
import createHomeSlice from "./homeSlice";

const useStore = create((set) => ({
  ...createHomeSlice(set),
}));

export default useStore;
