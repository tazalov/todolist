import React, { KeyboardEvent, useState } from "react";
import { v1 } from "uuid";
import { Button } from "../common/button/Button";
import { Todo } from "../todo/Todo";
import { EditableInput } from "../common/input/Input";

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
  const changeTaskValue = (value: string) => {
    setTaskValue(value);
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
        <EditableInput
          initialValue={taskValue}
          onChange={changeTaskValue}
          onKeyDown={onKeyDownHandler}
          error={error}
        />
        <Button title={"add"} callback={onClickHandler} />
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
        <Button
          title={"All"}
          callback={() => changeFilter("all")}
          styledClass={filter === "all" ? "active-btn" : ""}
        />
        <Button
          title={"Active"}
          callback={() => changeFilter("active")}
          styledClass={filter === "active" ? "active-btn" : ""}
        />
        <Button
          title={"Completed"}
          callback={() => changeFilter("completed")}
          styledClass={filter === "completed" ? "active-btn" : ""}
        />
      </div>
    </div>
  );
}
