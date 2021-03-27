import { ReactComponent as ListSvg } from "./assets/img/list.svg";
import { useState } from "react";

import List from "./components/List";
import AddList from "./components/AddList";
import "./App.scss";

import db from "./assets/db.json";

function App() {
  const [lists, setLists] = useState(
    db.lists.map((item) => {
      item.color = db.colors.filter(
        (color) => color.id === item.colorId
      )[0].name;
      return item;
    })
  );

  const handleCreateList = (obj) => {
    setLists((prev) => [...prev, obj]);
  };

  const handleRemoveList = (name) => {
    if (window.confirm("Вы уверены, что хотите удалить список?")) {
      setLists((prev) => prev.filter((item) => item.name !== name));
    }
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[{ icon: <ListSvg />, name: "Все задачи" }]} />
        <List items={lists} removable onRemove={handleRemoveList} />
        <AddList colors={db.colors} onAdd={handleCreateList} />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
