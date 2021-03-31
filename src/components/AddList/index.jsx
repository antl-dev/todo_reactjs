import { useState, useEffect } from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import { ReactComponent as AddSvg } from "../../assets/img/add.svg";
import { ReactComponent as CloseSvg } from "../../assets/img/close.svg";

import "./AddList.scss";

export default function AddList({ colors, onAdd }) {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [activeBadge, setActiveBadge] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setActiveBadge(colors[0].id);
    }
  }, [colors]);

  const handleShowVisiblePopup = () => {
    setVisiblePopup(true);
  };

  const handleCloseVisiblePopup = () => {
    setVisiblePopup(false);
    setInputValue("");
    setActiveBadge(() => colors[0].id);
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
    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: activeBadge,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === activeBadge)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        handleCloseVisiblePopup();
      })
      .catch(() => {
        alert("Ошибка при добавлении списка!");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        onClick={handleShowVisiblePopup}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <CloseSvg
            className="add-list__popup-close-btn"
            onClick={handleCloseVisiblePopup}
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

          <button
            onClick={handleCreateList}
            className="button"
            disabled={isLoading}
          >
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
}
