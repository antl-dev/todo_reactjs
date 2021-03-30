import { useState } from "react";

import { ReactComponent as AddSvg } from "../../assets/img/add.svg";
import "./Tasks.scss";

export default function AddTaskForm() {
  const [visibleForm, setVisibleForm] = useState(false);

  const toggleFormVisible = () => {
    setVisibleForm((prev) => !prev);
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div className="tasks__form-new" onClick={toggleFormVisible}>
          <AddSvg />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            // value={inputValue}
            // onChange={(e) => onChangeInput(e.target.value)}
            type="text"
            className="field"
            placeholder="Текст задачи"
          />
          <button className="button">Добавить задачу</button>
          <button className="button button--grey" onClick={toggleFormVisible}>
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}
