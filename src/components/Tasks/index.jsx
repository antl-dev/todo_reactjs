import { ReactComponent as EditSvg } from "../../assets/img/edit.svg";
import { ReactComponent as ChekSvg } from "../../assets/img/check.svg";
import "./Tasks.scss";

export default function Task() {
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        Фронтенд <EditSvg />
      </h2>
      <div className="tasks__items">
        <div className="tasks__items-row">
          <div className="checkbox">
            <input type="checkbox" id="chek" />
            <label htmlFor="chek" className="">
              <ChekSvg />
            </label>
          </div>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </div>
  );
}
