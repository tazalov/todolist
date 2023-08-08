import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "../common/button/Button";
import { Todo } from "../todo/Todo";
import { EditableInput } from "../common/input/Input";
import { FilterT, TaskT } from "../../App";
import { S } from "./Todolist.styled";

type TodolistPT = {
  id: string;
  title: string;
  tasksArr: TaskT[];
  filterValue: FilterT;
  changeFilter: (filter: FilterT, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  changeIsDone: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTitle: (taskId: string, title: string, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void;
};

export function Todolist({
  id,
  title,
  tasksArr,
  filterValue,
  changeFilter,
  addTask,
  removeTask,
  changeIsDone,
  changeTitle,
  removeTodolist,
}: TodolistPT) {
  const [titleValue, setTitleValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  //! ---------- handler for input with title new task
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value);
    setError("");
  };
  //! ---------- handler for input with title new task

  //! ---------- change array tasks
  const addTaskHandler = () => {
    const newTitle = titleValue.trim();
    if (!newTitle.length) {
      setError("Value can't be empty");
    } else {
      setTitleValue("");
      addTask(newTitle, id);
    }
  };
  const addTaskKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(titleValue);
      const newTitle = e.currentTarget.value.trim();
      if (!newTitle.length) {
        setError("Value can't be empty");
      } else {
        setTitleValue("");
        addTask(newTitle, id);
      }
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
    <S.Todolist>
      <h3>{title}</h3>
      <div>
        <Button title={"remove todolist"} callback={remove} />
      </div>
      <div>
        <EditableInput
          initialValue={titleValue}
          onChange={onChangeTitleHandler}
          onKeyDown={addTaskKeyDownHandler}
          onBlur={onBlurTitleHandler}
          error={error}
        />
        <Button title={"add"} callback={addTaskHandler} />
      </div>
      <ul>
        {tasksArr.map((t) => {
          const remove = () => removeTask(t.id, id);
          return (
            <Todo
              key={t.id}
              id={t.id}
              todolistId={id}
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
          callback={() => changeFilter("all", id)}
          styledClass={filterValue === "all" ? "active-btn" : ""}
        />
        <Button
          title={"Active"}
          callback={() => changeFilter("active", id)}
          styledClass={filterValue === "active" ? "active-btn" : ""}
        />
        <Button
          title={"Completed"}
          callback={() => changeFilter("completed", id)}
          styledClass={filterValue === "completed" ? "active-btn" : ""}
        />
      </div>
    </S.Todolist>
  );
}
