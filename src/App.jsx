import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import { useQuery } from "@tanstack/react-query";

import datafetching from "./hooks/datafetching";
import { useEffect } from "react";
import useStore from "./store/store";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { fetchDataFromApi } from "./utils/api";

function App() {
  // zustand store
  const getApiConfiguration = useStore((store) => store.getApiConfiguration);
  const getGenres = useStore((store) => store.getGenres);

  // size for banner
  const {
    isPending,
    error,
    data: res,
  } = useQuery({
    queryKey: ["sizeForBanner"],
    queryFn: () => datafetching("/configuration"),
  });

  useEffect(
    function () {
      if (isPending === false) {
        const url = {
          backdrop: res?.images.secure_base_url + "original",
          poster: res?.images.secure_base_url + "original",
          profile: res?.images.secure_base_url + "original",
        };
        getApiConfiguration(url);
        genresCall();
      }
    },
    [res, isPending]
  );

  const genresCall = async function () {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    getGenres(allGenres);
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
