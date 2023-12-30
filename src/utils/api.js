const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};

export const fetchDataFromApi = async function (url, params) {
  try {
    const response = await fetch(`${BASE_URL + url}`, options, params);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
