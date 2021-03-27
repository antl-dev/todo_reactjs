import clsx from "clsx";
import "./Badge.scss";
export default function Badge({ color, className, onClick }) {
  return (
    <i
      className={clsx("badge", { [`badge--${color}`]: color }, className)}
      onClick={onClick}
    ></i>
  );
}
