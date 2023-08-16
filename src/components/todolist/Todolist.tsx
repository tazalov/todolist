import React from "react";
import { Button } from "../common/button/Button";
import { Todo } from "../todo/Todo";
import { FilterT, TaskT } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AddItemForm } from "../common/addItemForm/AddItemFormPT";
import { EditableSpan } from "../common/editableSpan/EditableSpan";

type TodolistPT = {
  id: string;
  name: string;
  tasks: TaskT[];
  filterValue: FilterT;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
  changeTaskIsDone: (
    todolistId: string,
    taskId: string,
    isDone: boolean,
  ) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeFilter: (todolistId: string, filter: FilterT) => void;
  removeTodolist: (todolistId: string) => void;
  changeTitle: (todoListId: string, name: string) => void;
};

export function Todolist({
  id,
  name,
  tasks,
  filterValue,
  addTask,
  removeTask,
  changeTaskIsDone,
  changeTaskTitle,
  changeFilter,
  removeTodolist,
  changeTitle,
}: TodolistPT) {
  //! ---------- callback for addItemForm
  const addNewTask = (title: string) => {
    addTask(id, title);
  };
  //! ---------- callback for addItemForm

  //! ---------- callback for editableSpan
  const changeCurrentTitle = (title: string) => {
    changeTitle(id, title);
  };
  //! ---------- callback for editableSpan

  //! ---------- remove current todolist
  const remove = () => {
    removeTodolist(id);
  };
  //! ---------- remove current todolist

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>
          <EditableSpan title={name} changeTitle={changeCurrentTitle} />
        </h2>
        <Button
          title={<FontAwesomeIcon icon={faXmark} />}
          callback={remove}
          styledClass={""}
        />
      </div>
      <AddItemForm addItem={addNewTask} />
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
              changeIsDone={changeTaskIsDone}
              changeTitle={changeTaskTitle}
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
