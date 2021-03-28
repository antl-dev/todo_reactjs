import { useEffect, useState } from "react";

import { ReactComponent as ListSvg } from "./assets/img/list.svg";

import { List, AddList, Tasks } from "./components";
import "./App.scss";

import axios from "axios";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItemList, setActiveItemList] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const handleCreateList = (obj) => {
    setLists((prev) => [...prev, obj]);
  };

  const handleRemoveList = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить список?")) {
      axios.delete("http://localhost:3001/lists/" + id).then(() => {
        setLists((prev) => prev.filter((item) => item.id !== id));
      });
    }
  };

  const handleClickList = (obj) => {
    setActiveItemList(obj);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[{ icon: <ListSvg />, name: "Все задачи" }]} />
        {lists ? (
          <List
            items={lists}
            activeItem={activeItemList}
            onClickItem={handleClickList}
            onRemove={handleRemoveList}
          />
        ) : (
          "Загрузка..."
        )}
        <AddList colors={colors} onAdd={handleCreateList} />
      </div>
      <div className="todo__tasks">
        {lists && activeItemList && <Tasks list={activeItemList} />}
      </div>
    </div>
  );
}

export default App;
