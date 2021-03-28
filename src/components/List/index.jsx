import Badge from "../Badge";
import clsx from "clsx";

import "./List.scss";

import { ReactComponent as RemoveSvg } from "../../assets/img/remove.svg";

export default function List({ items, onClick, onRemove }) {
  return (
    <ul className="list" onClick={onClick}>
      {items.map(({ name, color, icon, active, className, id, tasks }) => (
        <li key={name} className={clsx(className, { active })}>
          {icon ? icon : <Badge color={color.name} />}
          <span>
            {name}
            {tasks && ` (${tasks.length})`}
          </span>
          {onRemove && (
            <RemoveSvg
              className="list__remove-icon"
              onClick={() => onRemove(id)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
