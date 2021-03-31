import { useState } from "react";
import axios from "axios";

import { ReactComponent as AddSvg } from "../../assets/img/add.svg";
import "./Tasks.scss";

export default function AddTaskForm({ list, handleAddTask }) {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inpItValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormVisible = () => {
    setVisibleForm((prev) => !prev);
    setInputValue("");
  };

  const onChangeInput = (value) => {
    setInputValue(value);
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inpItValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        handleAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(() => {
        alert("Ошибка при добавлении задачи!");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
            value={inpItValue}
            onChange={(e) => onChangeInput(e.target.value)}
            type="text"
            className="field"
            placeholder="Текст задачи"
          />
          <button className="button" onClick={addTask} disabled={isLoading}>
            {isLoading ? "Добавление..." : " Добавить задачу"}
          </button>
          <button
            className="button button--grey"
            onClick={toggleFormVisible}
            disabled={isLoading}
          >
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}
