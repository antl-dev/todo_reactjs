import { useState } from "react";

import List from "../List";
import Badge from "../Badge";
import { ReactComponent as AddSvg } from "../../assets/img/add.svg";
import { ReactComponent as CloseSvg } from "../../assets/img/close.svg";
import "./AddList.scss";

export default function AddList({ colors, onAdd }) {
  const [visiblePopup, setVisiblePopup] = useState(!false);
  const [activeBadge, setActiveBadge] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState("");

  const handleVisiblePopup = () => {
    setVisiblePopup((prev) => !prev);
  };

  const handleActiveBadge = (id) => {
    setActiveBadge(id);
  };

  const onChangeInput = (value) => {
    setInputValue(value);
  };

  const handleCreateList = () => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }
    const color = colors.filter((color) => color.id === activeBadge)[0].name;

    onAdd({
      id: Math.random(),
      name: inputValue,
      color,
    });
    handleVisiblePopup();
  };

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
          <input
            value={inputValue}
            onChange={(e) => onChangeInput(e.target.value)}
            type="text"
            className="field"
            placeholder="Название списка"
          />

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

          <button onClick={handleCreateList} className="button">
            Добавить
          </button>
        </div>
      )}
    </div>
  );
}
