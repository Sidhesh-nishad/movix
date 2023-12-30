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

function Trending() {
  const [endPoint, setEndPoint] = useState("day");
  const data = ["Day", "Week"];

  const onTabChange = function (tab) {
    setEndPoint(tab === "Day" ? "day" : "week");
  };

  const {
    isPending,
    error,
    data: trending,
  } = useQuery({
    queryKey: ["trending", endPoint],
    queryFn: () => datafetching(`/trending/movie/${endPoint}`),
  });

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="main">
          <span className="carouselTitle">Trending</span>
          <SwitchTabs data={data} onTabChange={onTabChange} />
        </div>
      </ContentWrapper>
      <Carousel data={trending?.results} loading={isPending} />
    </div>
  );
}

export default Trending;
