import "./style.scss";

import ContentWrapper from "../../../components/contentwrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import useStore from "../../../store/store";

const Cast = function ({ data, loading }) {
  const url = useStore((store) => store.url);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data.map((item) => {
              let imgurl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <div key={item.id} className="listItem">
                  <div className="profileImg">
                    <Img src={imgurl} />
                  </div>
                  <div className="name">{item?.name}</div>
                  <div className="character">{item?.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
