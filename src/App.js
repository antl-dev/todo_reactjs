import { useEffect, useState } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";

import { ReactComponent as ListSvg } from "./assets/img/list.svg";

import { List, AddList, Tasks } from "./components";

import axios from "axios";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItemList, setActiveItemList] = useState(null);

  let history = useHistory();
  // eslint-disable-next-line
  let location = useLocation();

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

  const handleRemoveList = (obj) => {
    if (window.confirm("Вы уверены, что хотите удалить список?")) {
      axios.delete("http://localhost:3001/lists/" + obj.id).then(() => {
        setLists((prev) => prev.filter((item) => item.id !== obj.id));
      });
    }
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

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      const newList = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios.delete("http://localhost:3001/tasks/" + taskId).catch(() => {
        alert("Не удалось удалить задачу!");
      });
    }
  };

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt("Текст задачи", taskObj.text);

    if (!newTaskText) {
      return;
    }

    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taskObj.id, {
        text: newTaskText,
      })
      .catch(() => {
        alert("Не удалось обновить задачу");
      });
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

  const onCompletedTask = (listId, taslId, completed) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taslId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taslId, {
        completed,
      })
      .catch(() => {
        alert("Не удалось обновить задачу!");
      });
  };

  useEffect(() => {
    const listId = history.location.pathname.split("lists/")[1];
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId));
      setActiveItemList(list);
    }
  }, [lists, history.location.pathname]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              active: history.location.pathname === "/",
              icon: <ListSvg />,
              name: "Все задачи",
            },
          ]}
          onClickItem={() => {
            history.push("/");
          }}
        />
        {lists ? (
          <List
            items={lists}
            activeItem={activeItemList}
            onClickItem={(list) => {
              history.push(`/lists/${list.id}`);
            }}
            onRemove={handleRemoveList}
          />
        ) : (
          "Загрузка..."
        )}
        <AddList colors={colors} onAdd={handleCreateList} />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {lists &&
            lists.map((list) => (
              <Tasks
                key={list.id}
                list={list}
                handleAddTask={handleAddTask}
                onEditTitle={onEditListTitle}
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
                onCompletedTask={onCompletedTask}
                withoutEmpty
              />
            ))}
        </Route>
        <Route path="/lists/:id">
          {lists && activeItemList && (
            <Tasks
              list={activeItemList}
              onEditTitle={onEditListTitle}
              handleAddTask={handleAddTask}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompletedTask={onCompletedTask}
            />
          )}
        </Route>
      </div>
    </div>
  );
}

export default App;
