import axios from "axios";

import AddTaskForm from "./AddTaskForm";
import { ReactComponent as EditSvg } from "../../assets/img/edit.svg";
import { ReactComponent as ChekSvg } from "../../assets/img/check.svg";
import "./Tasks.scss";

export default function Task({ list, onEditTitle }) {
  const editTitle = () => {
    const newTilte = window.prompt("Название списка", list.title);
    if (newTilte) {
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTilte,
        })
        .then(() => {
          onEditTitle(list.id, newTilte);
        })
        .catch(() => {
          alert("Неудалось изменить название!");
        });
    }
  };
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name} <EditSvg onClick={editTitle} />
      </h2>
      <div className="tasks__items">
        {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map(({ text, id }) => (
          <div className="tasks__items-row" key={id}>
            <div className="checkbox">
              <input type="checkbox" id={`check_${id}`} />
              <label htmlFor={`check_${id}`}>
                <ChekSvg />
              </label>
            </div>
            <input readOnly type="text" value={text} />
          </div>
        ))}
        <AddTaskForm />
      </div>
    </div>
  );
}
