import { ReactComponent as ListSvg } from "./assets/img/list.svg";

import List from "./components/List";
import AddList from "./components/AddList";
import "./App.scss";

import db from "./assets/db.json";

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[{ icon: <ListSvg />, name: "Все задачи" }]} />
        <List
          items={[
            { color: "green", name: "Фронтенд", active: true },
            { color: "blue", name: "Фильмы" },
            { color: "pink", name: "Книги" },
          ]}
          removable
        />
        <AddList colors={db.colors} />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
