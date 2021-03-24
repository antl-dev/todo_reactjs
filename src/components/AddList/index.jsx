import { useState } from "react";

import List from "../List";
import Badge from "../Badge";
import { ReactComponent as AddSvg } from "../../assets/img/add.svg";
import { ReactComponent as CloseSvg } from "../../assets/img/close.svg";
import "./AddList.scss";

export default function AddList({ colors }) {
  const [visiblePopup, setVisiblePopup] = useState(!false);
  const [activeBadge, setActiveBadge] = useState(colors[0].id);

  const handleVisiblePopup = () => {
    setVisiblePopup((prev) => !prev);
  };

  const handleActiveBadge = (id) => {
    setActiveBadge(id);
  };

  console.log(activeBadge);

  return (
    <div className="add-list">
      <List
        items={[
          {
            className: "list__add-button",
            icon: <AddSvg />,
            name: "Добавить список",
          },
        ]}
        onClick={handleVisiblePopup}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <CloseSvg
            className="add-list__popup-close-btn"
            onClick={handleVisiblePopup}
          />
          <input type="text" className="field" placeholder="Название списка" />

          <div className="add-list__popup-colors">
            {colors.map(({ name, id }) => (
              <Badge
                key={id}
                color={name}
                className={activeBadge === id ? "active" : ""}
                onClick={() => handleActiveBadge(id)}
              />
            ))}
          </div>

          <button className="button">Добавить</button>
        </div>
      )}
    </div>
  );
}
