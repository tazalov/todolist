import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "../common/button/Button";
import { Todo } from "../todo/Todo";
import { FilterT, TaskT } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

type TodolistPT = {
  id: string;
  name: string;
  tasks: TaskT[];
  filterValue: FilterT;
  changeFilter: (todolistId: string, filter: FilterT) => void;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
  changeIsDone: (todolistId: string, taskId: string, isDone: boolean) => void;
  changeTitle: (todolistId: string, taskId: string, title: string) => void;
  removeTodolist: (todolistId: string) => void;
};

export function Todolist({
  id,
  name,
  tasks,
  filterValue,
  changeFilter,
  addTask,
  removeTask,
  changeIsDone,
  changeTitle,
  removeTodolist,
}: TodolistPT) {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  //! ---------- handler for input with title new task
  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setError("");
  };
  //! ---------- handler for input with title new task

  //! ---------- change array tasks
  const addNewTask = () => {
    const newTitle = title.trim();
    if (!newTitle.length) {
      setError("Value can't be empty");
    } else {
      setTitle("");
      addTask(id, newTitle);
    }
  };
  const addTaskHandler = () => {
    addNewTask();
  };
  const addTaskKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewTask();
    }
  };
  //! ---------- change array tasks

  //! ---------- change error msg
  const onBlurTitleHandler = () => {
    setError("");
  };
  //! ---------- change error msg

  //! ---------- remove current todolist
  const remove = () => {
    removeTodolist(id);
  };
  //! ---------- remove current todolist

  return (
    <div>
      <h2>
        {name}
        <Button
          title={<FontAwesomeIcon icon={faXmark} />}
          callback={remove}
          styledClass={""}
        />
      </h2>

      <input
        type={"text"}
        value={title}
        onChange={changeTitleHandler}
        onKeyDown={addTaskKeyDownHandler}
        onBlur={onBlurTitleHandler}
      />
      <Button
        title={<FontAwesomeIcon icon={faPlus} />}
        callback={addTaskHandler}
        styledClass={""}
      />
      {error && <div className={"error-msg"}>{error}</div>}
      <ul>
        {tasks.map((el) => {
          const removeCurrentTask = () => removeTask(id, el.id);
          return (
            <Todo
              key={el.id}
              id={el.id}
              todolistId={id}
              title={el.title}
              isDone={el.isDone}
              changeIsDone={changeIsDone}
              changeTitle={changeTitle}
              remove={removeCurrentTask}
            />
          );
        })}
      </ul>
      <div>
        <Button
          title={"All"}
          callback={() => changeFilter(id, "all")}
          styledClass={filterValue === "all" ? "active-btn" : ""}
        />
        <Button
          title={"Active"}
          callback={() => changeFilter(id, "active")}
          styledClass={filterValue === "active" ? "active-btn" : ""}
        />
        <Button
          title={"Completed"}
          callback={() => changeFilter(id, "completed")}
          styledClass={filterValue === "completed" ? "active-btn" : ""}
        />
      </div>
    </div>
  );
}
