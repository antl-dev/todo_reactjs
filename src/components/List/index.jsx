import Badge from "../Badge";
import clsx from "clsx";
import "./List.scss";

import { ReactComponent as RemoveSvg } from "../../assets/img/remove.svg";

export default function List({ items, onClick, removable, onRemove }) {
  return (
    <ul className="list" onClick={onClick}>
      {items.map(({ name, color, icon, active, className }) => (
        <li key={name} className={clsx(className, { active })}>
          {icon ? icon : <Badge color={color} />}
          <span>{name}</span>
          {removable && (
            <RemoveSvg
              className="list__remove-icon"
              onClick={() => onRemove(name)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
