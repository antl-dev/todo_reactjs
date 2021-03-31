import { useEffect, useState } from "react";
import { Route } from "react-router-dom";

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

  const handleAddTask = (listid, taskObj) => {
    const newList = lists.map((list) => {
      if (list.id === listid) {
        list.tasks = [...list.tasks, taskObj];
      }
      return list;
    });

    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    console.log(id, title);
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });

    setLists(newList);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[{ active: true, icon: <ListSvg />, name: "Все задачи" }]}
        />
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
        <Route exact patch="/">
          {lists &&
            lists.map((item) => (
              <Tasks
                list={item}
                onEditTitle={onEditListTitle}
                handleAddTask={handleAddTask}
                withoutEmpty
              />
            ))}
        </Route>
        <Route patch="/lists/:id">
          {lists && activeItemList && (
            <Tasks
              list={activeItemList}
              onEditTitle={onEditListTitle}
              handleAddTask={handleAddTask}
            />
          )}
        </Route>
      </div>
    </div>
  );
}

export default App;
