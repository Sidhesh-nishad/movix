import { useState } from "react";
import "./style.scss";
function SwitchTabs({ data, onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = function (tab, index) {
    setLeft(index * 100);
    setTimeout(function () {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, i) => (
          <span
            key={i}
            className={`tabItem ${selectedTab === i ? "active" : ""}`}
            onClick={() => activeTab(tab, i)}
          >
            {tab}
          </span>
        ))}

        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
}

export default SwitchTabs;
