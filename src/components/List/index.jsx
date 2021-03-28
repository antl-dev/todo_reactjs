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
  return (
    <ul className="list" onClick={onClick}>
      {items.map((item) => (
        <li
          key={item.name}
          className={clsx(item.className, {
            active: activeItem && item.name === activeItem.name,
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          {item.icon ? item.icon : <Badge color={item.color.name} />}
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.length})`}
          </span>
          {onRemove && (
            <RemoveSvg
              className="list__remove-icon"
              onClick={() => onRemove(item.id)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
