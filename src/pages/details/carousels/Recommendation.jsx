import React from "react";

import Carousel from "../../../components/carousel/Carousel";

import { useQuery } from "@tanstack/react-query";
import datafetching from "../../../hooks/datafetching";

const Recommendation = ({ mediaType, id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["recommendation", mediaType, id],
    queryFn: () => datafetching(`/${mediaType}/${id}/recommendations`),
  });
  if (data?.results.length === 0) return;

  return (
    <Carousel
      title="Recommendations"
      data={data?.results}
      loading={isPending}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;
