export const createHomeSlice = (set) => ({
  name: "home",
  url: {},
  genres: {},
  getApiConfiguration: (path) => set(() => ({ url: path })),
  setBg: (path) => set(() => ({ bg: path })),
  getGenres: (state) => set(() => ({ genres: state })),
});

export default createHomeSlice;
