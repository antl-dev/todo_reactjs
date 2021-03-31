import axios from "axios";

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
      <h2 className="tasks__title" style={{ color: list.color.hex }}>
        {list.name} <EditSvg onClick={editTitle} />
      </h2>
      <div className="tasks__items">
        {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks &&
          list.tasks.map(({ text, id, completed }) => (
            <Task
              key={id}
              text={text}
              id={id}
              completed={completed}
              list={list}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              onCompleted={onCompletedTask}
            />
          ))}
        <AddTaskForm key={list.id} list={list} handleAddTask={handleAddTask} />
      </div>
    </div>
  );
}
