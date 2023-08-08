import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { S } from "./Todo.styled";
import { ButtonIcon } from "../common/button/ButtonIcon";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TodoPT = {
  id: string;
  todolistId: string;
  title: string;
  isDone: boolean;
  changeIsDone: (taskId: string, isDone: boolean, todolistId: string) => void;
  remove: () => void;
  changeTitle: (taskId: string, title: string, todolistId: string) => void;
};

//? u can use React.memo
export const Todo = React.memo(function ({
  id,
  todolistId,
  title,
  isDone,
  changeIsDone,
  remove,
  changeTitle,
}: TodoPT) {
  const [currentTitle, setCurrentTitle] = useState<string>(title);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  //! ---------- (de)activate edit mode for change title current task
  const toggleEditMode = () => setEditMode((prev) => !prev);
  //! ---------- (de)activate edit mode for change title current task

  //! ---------- change title current task
  const addTitle = () => {
    const newTitle = currentTitle.trim();
    if (newTitle.length === 0) {
      setError("Value can't be empty");
    } else if (newTitle !== title) {
      changeTitle(id, currentTitle, todolistId);
      setEditMode(false);
    } else {
      setEditMode(false);
    }
  };
  const addTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTitle();
    }
  };
  const addTitleBlurHandler = () => {
    addTitle();
  };
  //! ---------- change title current task

  //! ---------- handler for input with title current task
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.currentTarget.value);
    setError("");
  };
  //! ---------- handler for input with title current task

  //! ---------- change isDone current task
  const onChangeDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeIsDone(id, e.currentTarget.checked, todolistId);
  };
  //! ---------- change isDone current task

  return (
    <S.Todo
      as={"li"}
      className={isDone ? "is-done" : ""}
      gap={"10px"}
      align={"center"}
    >
      <input
        type="checkbox"
        checked={isDone}
        onChange={onChangeDoneHandler}
        disabled={editMode}
      />
      {editMode ? (
        <S.Form>
          <input
            type={"text"}
            value={currentTitle}
            onChange={onChangeTitleHandler}
            onBlur={addTitleBlurHandler}
            onKeyDown={addTitleKeyDownHandler}
            autoFocus={true}
          />
          {error && <S.Error>{error}</S.Error>}
        </S.Form>
      ) : (
        <span onClick={toggleEditMode}>{title}</span>
      )}
      <ButtonIcon
        title={<FontAwesomeIcon icon={faXmark} />}
        callback={remove}
        disable={editMode}
      />
    </S.Todo>
  );
});
