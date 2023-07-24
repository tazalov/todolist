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

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;
