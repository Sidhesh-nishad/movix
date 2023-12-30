import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

import "./style.scss";

import ContentWrapper from "../../../components/contentwrapper/ContentWrapper";

import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import datafetching from "../../../hooks/datafetching.js";
import useStore from "../../../store/store.js";
import { PlayIcon } from "../Playbtn.jsx";
import VideoPopup from "../../../components/videoPopup/VideoPopup.jsx";
import Cast from "../cast/Cast.jsx";

const DetailsBanner = function ({ video, crew, data, loadings }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();

  //zustand store
  const url = useStore((store) => store.url);

  const {
    isPending: loading,
    error,
    data: details,
  } = useQuery({
    queryKey: ["details", mediaType, id],
    queryFn: () => datafetching(`/${mediaType}/${id}`),
  });

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const _genres = details?.genres?.map((g) => g.id);
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {details && (
            <Fragment>
              <div className="backdrop-img">
                <Img src={url?.backdrop + details?.backdrop_path} />
              </div>
              <div className="opacity-layer"> </div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {details.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url?.backdrop + details?.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${details?.name || details?.title} (${dayjs(
                        details?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{details?.tagline}</div>
                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating rating={details?.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>

                      <div className="description">{details.overview}</div>
                    </div>
                    <div className="info">
                      {details.status && (
                        <div className="infoItem">
                          <span className="text bold">Status : </span>
                          <span className="text">{details.status}</span>
                        </div>
                      )}
                      {details.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date : </span>
                          <span className="text">
                            {dayjs(details.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {details.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Run Time : </span>
                          <span className="text">
                            {toHoursAndMinutes(details.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director : </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ","}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer : </span>
                        <span className="text">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ","}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {details.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creater : </span>
                        <span className="text">
                          {details.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {details.created_by.length - 1 !== i && ","}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ContentWrapper>
              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
