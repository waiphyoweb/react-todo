import { AppBar, Box, Toolbar } from "@mui/material"
import { indigo } from "@mui/material/colors"
import { useEffect, useState } from "react";
import {Routes, Route} from 'react-router-dom';

import Title from "./Title"
import Tasks from "./Tasks";

const api = "http://localhost:8000";

export default function App() {
  const [ items, setItems ] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${api}/tasks`);
      const tasks = await res.json();

      setItems(tasks);
      console.log("Data fetch successfully!");
    })();
  },[]);

  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: indigo[500] }}>
        <Toolbar>
            <Title />
        </Toolbar>
      </AppBar>
      <Routes>
        <Route 
          path="/"
          element={
            <Box>
              <Tasks items={items} />
            </Box>
          }
        />
      </Routes>
    </Box>
  );
};