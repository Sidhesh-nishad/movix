import { fetchDataFromApi } from "../utils/api";

const datafetching = async (url) => {
  const res = await fetchDataFromApi(url);
  return res;
};
export default datafetching;
