import HeroBanner from "./heroBanner/HeroBanner";

import Popular from "./popular/popular";
import "./style.scss";
import TopRated from "./topRated/TopRated";
import Trending from "./trending/Trending";

function Home() {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
}

export default Home;