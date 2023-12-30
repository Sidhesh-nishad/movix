import { useEffect, useState } from "react";
import ContentWrapper from "../../../components/contentwrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchtab/SwitchTabs";
import "../style.scss";
import datafetching from "../../../hooks/datafetching";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Carousel from "../../../components/carousel/Carousel";

function Popular() {
  const [endPoint, setEndPoint] = useState("movie");
  const data = ["Movies", "Tv Shows"];

  const onTabChange = function (tab) {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  const {
    isPending,
    error,
    data: popular,
  } = useQuery({
    queryKey: ["popular", endPoint],
    queryFn: () => datafetching(`/${endPoint}/popular`),
  });

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="main">
          <span className="carouselTitle">What's Popular</span>
          <SwitchTabs data={data} onTabChange={onTabChange} />
        </div>
      </ContentWrapper>
      <Carousel
        data={popular?.results}
        loading={isPending}
        endPoint={endPoint}
      />
    </div>
  );
}

export default Popular;
