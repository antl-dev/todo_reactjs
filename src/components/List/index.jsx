import Badge from "../Badge";
import classnames from "classnames";
import "./List.scss";

export default function List({ items, onClick, removable }) {
  return (
    <ul className="list" onClick={onClick}>
      {items.map(({ name, color, icon, active, className }) => (
        <li key={name} className={classnames(className, { active })}>
          {icon ? icon : <Badge color={color} />}
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}
