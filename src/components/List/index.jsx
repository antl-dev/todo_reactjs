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
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={clsx(item.className, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id,
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.length})`}
          </span>
          {onRemove && (
            <RemoveSvg
              className="list__remove-icon"
              onClick={() => onRemove(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
