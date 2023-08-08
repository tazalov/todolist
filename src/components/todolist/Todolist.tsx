import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { v1 } from "uuid";
import { Button } from "../common/button/Button";
import { Todo } from "../todo/Todo";

type TaskT = {
  id: string;
  title: string;
  isDone: boolean;
};

type FilterT = "all" | "active" | "completed";

type TodolistPT = {
  title: string;
  tasks: TaskT[];
};

export function Todolist(props: TodolistPT) {
  const [tasks, setTasks] = useState<TaskT[]>(props.tasks);
  const [filter, setFilter] = useState<FilterT>("all");
  const [taskValue, setTaskValue] = useState<string>("");

  const [error, setError] = useState<string>("");

  //! ---------- handler for input with title new task
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.currentTarget.value);
    setError("");
  };
  //! ---------- handler for input with title new task

  //! ---------- change array tasks
  const addTask = (title: string) => {
    const newTitle = title.trim();
    if (newTitle.length) {
      const newTask = { id: v1(), title: newTitle, isDone: false };
      setTasks([newTask, ...tasks]);
    } else {
      setError("Value can't be empty");
    }
  };
  const removeTask = (id: string) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask(e.currentTarget.value);
      setTaskValue("");
    }
  };
  const onClickHandler = () => {
    addTask(taskValue);
    setTaskValue("");
  };
  //! ---------- change array tasks

  //! ---------- filtered tasks
  const changeFilter = (filter: FilterT) => {
    setFilter(filter);
  };
  const filteredTasks = () => {
    switch (filter) {
      case "completed": {
        return tasks.filter((el) => el.isDone);
      }
      case "active": {
        return tasks.filter((el) => !el.isDone);
      }
      default: {
        return tasks;
      }
    }
  };
  //! ---------- filtered tasks

  //! ---------- change specific task
  const changeIsDone = (id: string, isDone: boolean) => {
    const newTasks = tasks.map((el) =>
      el.id === id
        ? {
            ...el,
            isDone,
          }
        : el,
    );
    setTasks(newTasks);
  };
  const changeTitle = (id: string, newTitle: string) => {
    const newTasks = tasks.map((el) =>
      el.id === id ? { ...el, title: newTitle } : el,
    );
    setTasks(newTasks);
  };
  //! ---------- change specific task

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={taskValue}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <Button title={"add"} callback={onClickHandler} />
        {error && <span className="error-msg">{error}</span>}
      </div>
      <ul>
        {filteredTasks().map((t) => {
          const remove = () => removeTask(t.id);
          return (
            <Todo
              key={t.id}
              id={t.id}
              title={t.title}
              isDone={t.isDone}
              changeIsDone={changeIsDone}
              remove={remove}
              changeTitle={changeTitle}
            />
          );
        })}
      </ul>
      <div>
        <button
          onClick={() => changeFilter("all")}
          className={filter === "all" ? "active-btn" : ""}
        >
          All
        </button>
        <button
          onClick={() => changeFilter("active")}
          className={filter === "active" ? "active-btn" : ""}
        >
          Active
        </button>
        <button
          onClick={() => changeFilter("completed")}
          className={filter === "completed" ? "active-btn" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
