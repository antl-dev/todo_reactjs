import axios from "axios";
import { Link } from "react-router-dom";

import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import { ReactComponent as EditSvg } from "../../assets/img/edit.svg";

import "./Tasks.scss";

export default function Tasks({
  list,
  onEditTitle,
  handleAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompletedTask,
}) {
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
          alert("Не удалось изменить название!");
        });
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <EditSvg onClick={editTitle} />
        </h2>
      </Link>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompletedTask}
              {...task}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={handleAddTask} />
      </div>
    </div>
  );
}
