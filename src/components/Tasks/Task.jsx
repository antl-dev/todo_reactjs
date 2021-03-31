import { ReactComponent as ChekSvg } from "../../assets/img/check.svg";
import { ReactComponent as EditSvg } from "../../assets/img/edit.svg";
import { ReactComponent as RemoveSvg } from "../../assets/img/remove.svg";
export default function Task({ id, text, list, onRemove, onEdit }) {
  return (
    <div key={id} className="tasks__items-row">
      <div className="checkbox">
        <input id={`task-${id}`} type="checkbox" />
        <label htmlFor={`task-${id}`}>
          <ChekSvg />
        </label>
      </div>
      <p>{text}</p>
      <div className="tasks__items-row-actions">
        <div onClick={() => onEdit(list.id, { id, text })}>
          <EditSvg />
        </div>
        <div onClick={() => onRemove(list.id, id)}>
          <RemoveSvg />
        </div>
      </div>
    </div>
  );
}
