import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";

export type FilterT = "all" | "active" | "completed";

export type TaskT = {
  id: number;
  title: string;
  isDone: boolean;
};

function App() {
  const [tasks, setTasks] = useState<TaskT[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterT>("all");

  let currentTasks = tasks;

  switch (filter) {
    case "completed": {
      currentTasks = tasks.filter((el) => el.isDone);
      break;
    }
    case "active": {
      currentTasks = tasks.filter((el) => !el.isDone);
      break;
    }
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const changeFilter = (filter: FilterT) => {
    setFilter(filter);
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={currentTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
