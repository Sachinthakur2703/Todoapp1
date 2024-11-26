import React, { useState } from 'react';
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [store, setStore] = useState([]);
  const [editing, setEditing] = useState(null);

  const handleAdd = (e) => {
    if (e.key === "Enter") {
      if (todo === "") {
        return [];
      }
      const arr = {
        id: store.length+1,
        task: todo
      };
      setStore([...store, arr]);
      setTodo("");
    }
  };

  const handleDelete = (ID) => {
    setStore((prev) => prev.filter((items) => items.id!== ID));
  };

  const handleAsc = () => {
    const asc = [...store].sort((a, b) => a.task.localeCompare(b.task));
    setStore(asc);
  };

  const handleDsc = () => {
    const dsc = [...store].sort((a, b) => b.task.localeCompare(a.task));
    setStore(dsc);
  };

  const handleEdit = (ID) => {
    setEditing(ID);
  };

  const handleUpdate = (e) => {
    if (e.key === "Enter") {
    
      setStore((prev) => prev.map((item) => {
        if (item.id === editing) {
          return {...item, task:  e.target.value };
        }
        return item;
      }));
      setEditing(null);
    }
  };

  return (
    <>
      <div className='container'>
        <input type="text" placeholder='enter your task' value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress={handleAdd} />
        <button onClick={handleAsc}>Asc</button>
        <button onClick={handleDsc}>Dsc</button>

        <div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Task</th>
                <th>Action</th>
              </tr>
            </thead>

            {store.map((value) => (
              <tbody>
                <tr key={value.id}>
                  <td>{value.id}</td>
                  <td>
                    {editing === value.id? (
                      <input type="text" value={value.task}
                        onChange={(e) => setStore((prev) => prev.map((item) => {
                          if (item.id === editing) {
                            return {...item, task: e.target.value };
                          }
                          return item;
                        }))}
                        onKeyPress={handleUpdate} />
                    ) : (
                      value.task
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(value.id)}>delete</button>
                    <button onClick={() => handleEdit(value.id)}>edit</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default App;