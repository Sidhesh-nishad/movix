import Carousel from "../../../components/carousel/Carousel";
import datafetching from "../../../hooks/datafetching";

import { useQuery } from "@tanstack/react-query";

const Similar = ({ mediaType, id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["similar", mediaType, id],
    queryFn: () => datafetching(`/${mediaType}/${id}/similar`),
  });

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={isPending}
      endpoint={mediaType}
    />
  );
};

export default Similar;
