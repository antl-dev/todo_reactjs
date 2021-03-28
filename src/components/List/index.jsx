import Badge from "../Badge";
import clsx from "clsx";

import "./List.scss";

import { ReactComponent as RemoveSvg } from "../../assets/img/remove.svg";

export default function List({
  items,
  onClick,
  onRemove,
  activeItem,
  onClickItem,
}) {
  console.log(activeItem);
  return (
    <ul className="list" onClick={onClick}>
      {items.map(({ name, color, icon, className, id, tasks }) => (
        <li
          key={name}
          className={clsx(className, {
            active: activeItem && name === activeItem.name,
          })}
          onClick={onClickItem ? () => onClickItem({ name, tasks }) : null}
        >
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
