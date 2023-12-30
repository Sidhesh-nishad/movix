import { useEffect, useState } from "react";
import ContentWrapper from "../../../components/contentwrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchtab/SwitchTabs";
import "../style.scss";
import datafetching from "../../../hooks/datafetching";
import { useQuery } from "@tanstack/react-query";
import Carousel from "../../../components/carousel/Carousel";

function TopRated() {
  const [endPoint, setEndPoint] = useState("movie");
  const data = ["Movies", "Tv Shows"];

  const onTabChange = function (tab) {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  const {
    isPending,
    error,
    data: topRated,
  } = useQuery({
    queryKey: ["topRated", endPoint],
    queryFn: () => datafetching(`/${endPoint}/top_rated`),
  });

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="main">
          <span className="carouselTitle">Top Rated</span>
          <SwitchTabs data={data} onTabChange={onTabChange} />
        </div>
      </ContentWrapper>
      <Carousel
        data={topRated?.results}
        loading={isPending}
        endPoint={endPoint}
      />
    </div>
  );
}

export default TopRated;
