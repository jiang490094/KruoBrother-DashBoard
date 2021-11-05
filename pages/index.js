import dynamic from "next/dynamic";

import Globalprovider from "../provider/globalprovider";

const Map = dynamic(() => import("../view/map"));
const Time = dynamic(() => import("../view/Time"));
const PieChart = dynamic(() => import("../view/PieChart"));
const Background = dynamic(() => import("../view/background"));
const Celebrate = dynamic(() => import("../view/celebrate"));
const SiteNumber = dynamic(() => import("../view/SiteNumber"));
const Ranking = dynamic(() => import("../view/ranking"));
const Title = dynamic(() => import("../view/Title"));
const MileStone = dynamic(() => import("../view/MileStone"));

function HomePage() {
  return (
    <div>
      <Globalprovider>
        <div className="dead-line">
          <Time />
          <PieChart siteName="生活市集" siteColor="rgba(255, 107, 0, 1)" />
          <PieChart siteName="松果購物" siteColor="rgba(247, 66, 47, 1)" />
          <SiteNumber />
        </div>
        <Ranking />
        <Title />
        <Map />
        <Background />
        <Celebrate />
        <MileStone />
      </Globalprovider>
    </div>
  );
}

export default HomePage;
