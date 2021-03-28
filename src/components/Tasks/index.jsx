import { ReactComponent as EditSvg } from "../../assets/img/edit.svg";
import { ReactComponent as ChekSvg } from "../../assets/img/check.svg";
import "./Tasks.scss";

export default function Task({ list }) {
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name} <EditSvg />
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
      </div>
    </div>
  );
}
