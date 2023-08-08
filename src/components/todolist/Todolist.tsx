import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "../common/button/Button";
import { Todo } from "../todo/Todo";
import { EditableInput } from "../common/input/Input";
import { FilterT, TaskT } from "../../App";
import { S } from "./Todolist.styled";
import { ButtonIcon } from "../common/button/ButtonIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

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
    <S.Todolist
      direction={"column"}
      gap={"10px"}
      align={"center"}
      justify={"center"}
    >
      <S.Title>{title}</S.Title>
      <S.Close>
        <ButtonIcon
          title={<FontAwesomeIcon icon={faXmark} />}
          callback={remove}
        />
      </S.Close>
      <S.Form gap={"5px"}>
        <EditableInput
          initialValue={titleValue}
          onChange={onChangeTitleHandler}
          onKeyDown={addTaskKeyDownHandler}
          onBlur={onBlurTitleHandler}
          error={error}
        />
        <ButtonIcon
          title={<FontAwesomeIcon icon={faPlus} />}
          callback={addTaskHandler}
        />
      </S.Form>
      <S.List as={"ul"} direction={"column"} align={"flex-start"}>
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
      </S.List>
      <S.Buttons gap={"10px"}>
        <Button
          title={"All"}
          callback={() => changeFilter("all", id)}
          active={filterValue === "all" ? "true" : "false"}
        />
        <Button
          title={"Active"}
          callback={() => changeFilter("active", id)}
          active={filterValue === "active" ? "true" : "false"}
        />
        <Button
          title={"Completed"}
          callback={() => changeFilter("completed", id)}
          active={filterValue === "completed" ? "true" : "false"}
        />
      </S.Buttons>
    </S.Todolist>
  );
}
