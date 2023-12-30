import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import "./style.scss";
import datafetching from "../../hooks/datafetching";
import DetailsBanner from "./detailBanner/DetailBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosection/VideoSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import { useEffect } from "react";

function Details() {
  const { mediaType, id } = useParams();
  const { isPending, data } = useQuery({
    queryKey: ["details", id],
    queryFn: () => datafetching(`/${mediaType}/${id}/videos`),
  });

  const { isPending: loading, data: credits } = useQuery({
    queryKey: ["credits", id],
    queryFn: () => datafetching(`/${mediaType}/${id}/credits`),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={loading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
}

export default Details;
