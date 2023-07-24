import React, { useState } from "react";
import { FilterT, TaskT } from "./App";

type PropsType = {
  title: string;
  tasks: TaskT[];
  removeTask: (id: number) => void;
};

export function Todolist(props: PropsType) {
  const [filter, setFilter] = useState<FilterT>("all");
  let currentTasks = props.tasks;

  const changeFilter = (filter: FilterT) => {
    setFilter(filter);
  };

  switch (filter) {
    case "completed": {
      currentTasks = props.tasks.filter((el) => el.isDone);
      break;
    }
    case "active": {
      currentTasks = props.tasks.filter((el) => !el.isDone);
      break;
    }
  }
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {currentTasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />{" "}
            <span>{task.title}</span>
            <button onClick={() => props.removeTask(task.id)}>x</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => changeFilter("all")}>All</button>
        <button onClick={() => changeFilter("active")}>Active</button>
        <button onClick={() => changeFilter("completed")}>Completed</button>
      </div>
    </div>
  );
}
