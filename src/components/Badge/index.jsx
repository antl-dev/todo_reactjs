import classnames from "classnames";
import "./Badge.scss";
export default function Badge({ color, className, onClick }) {
  return (
    <i
      className={classnames("badge", { [`badge--${color}`]: color }, className)}
      onClick={onClick}
    ></i>
  );
}
