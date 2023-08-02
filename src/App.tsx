import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    {
      id: v1(),
      title: "HTML&CSS",
      isDone: true,
    },
    {
      id: v1(),
      title: "JS",
      isDone: true,
    },
    {
      id: v1(),
      title: "ReactJS",
      isDone: false,
    },
    {
      id: v1(),
      title: "Rest API",
      isDone: false,
    },
    {
      id: v1(),
      title: "GraphQL",
      isDone: false,
    },
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function addTask(task: string) {
    const newTask = {
      id: v1(),
      title: task,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  }

  const changeIsDone = (id: string, isDone: boolean) => {
    const newTasks = tasks.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          isDone: isDone,
        };
      }
      return el;
    });
    setTasks(newTasks);
  };

  const changeIsDone2 = (id: string, isDone: boolean) => {
    const task = tasks.find((el) => el.id === id);
    if (task) {
      task.isDone = !isDone;
    }
    const copy = [...tasks];
    setTasks(copy);
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeIsDone={changeIsDone}
        changeIsDone2={changeIsDone2}
      />
    </div>
  );
}

export default App;
