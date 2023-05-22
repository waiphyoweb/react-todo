import { AppBar, Box, Divider, Toolbar } from "@mui/material"
import { indigo } from "@mui/material/colors"
import { useEffect, useState } from "react";
import {Routes, Route} from 'react-router-dom';

import Title from "./Title"
import Tasks from "./Tasks";
import NewTask from "./NewTask";
import Edit from "./Edit";

const api = "http://localhost:8000";

export default function App() {
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${api}/tasks`);
      const tasks = await res.json();

      setItems(tasks);
    })();
  },[]);

  const add = subject => {
    (async () => {
      const res = await fetch(`${api}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject }),
      });

      const task = await res.json();

      setItems([task, ...items]);
    })();
  };

  const remove = id => {
    fetch(`${api}/tasks/${id}`, {
      method: "DELETE",
    });

    const result = items.filter(item => item._id !== id);
    setItems(result);
  };

  const update = ( id, subject ) => {
    fetch(`${api}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject }),
    });

    const result = items.map(item => {
      if(item._id === id) item.subject = subject;
      return item;
    });
    setItems(result);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: indigo[500], mb: 3 }}>
        <Toolbar>
            <Title />
        </Toolbar>
      </AppBar>
      <Routes>
        <Route 
          path="/"
          element={
            <Box sx={{ mx: {lg: "200px", md: "100px", sm: "50px"}}}>
              <NewTask add={add} />
              <Tasks items={items.filter(item => !item.done)} remove={remove} />
              <Divider />
              <Tasks items={items.filter(item => item.done)} remove={remove} />
            </Box>
          }
        />
        <Route path="/tasks/:id" element={
          <Edit update={update} />
        } />
      </Routes>
    </Box>
  );
};