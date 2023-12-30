import { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import datafetching from "../../../hooks/datafetching";
import useStore from "../../../store/store";
import Img from "@/components/lazyLoadImage/Img";

//baseurl +size + filePath-

function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // zustand store
  const urlData = useStore((store) => store.url);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      return navigate(`/search/${query}`);
    }
  };

  // file path
  const {
    isPending,
    error,
    data: upcomingData,
  } = useQuery({
    queryKey: ["upcoming movies"],
    queryFn: () => datafetching("/movie/upcoming"),
  });

  useEffect(
    function () {
      const backdropPath =
        urlData.backdrop +
        upcomingData?.results[Math.floor(Math.random() * 20)].backdrop_path;
      setBackground(backdropPath);
    },
    [upcomingData, urlData]
  );

  return (
    <div className="heroBanner">
      {isPending === false && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacityLayer"></div>
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title"></span>
          <span className="subtitle">
            Millions of Movies,TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              onKeyUp={(e) => searchQueryHandler(e)}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for movie or tv show..."
            />
            <button onClick={() => navigate(`/search/${query}`)}>search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
