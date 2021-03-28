import { ReactComponent as AddSvg } from "../../assets/img/add.svg";
import "./Tasks.scss";

export default function AddTaskForm() {
  return (
    <div className="tasks__form">
      <div className="tasks__form-new">
        <AddSvg />
        <span>Новая задача</span>
      </div>
    </div>
  );
}
