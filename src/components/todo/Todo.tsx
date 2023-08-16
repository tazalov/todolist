import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../common/button/Button";

type TodoPT = {
  id: string;
  todolistId: string;
  title: string;
  isDone: boolean;
  changeIsDone: (todolistId: string, taskId: string, isDone: boolean) => void;
  changeTitle: (todolistId: string, taskId: string, title: string) => void;
  remove: () => void;
};

export function Todo({
  id,
  todolistId,
  title,
  isDone,
  changeIsDone,
  changeTitle,
  remove,
}: TodoPT) {
  const [currentTitle, setCurrentTitle] = useState<string>(title);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  //! ---------- (de)activate edit mode for change title current task
  const toggleEditMode = () => setEditMode((prev) => !prev);
  //! ---------- (de)activate edit mode for change title current task

  //! ---------- change title current task
  const updateTitle = () => {
    const newTitle = currentTitle.trim();
    if (newTitle.length === 0) {
      setError("Value can't be empty");
    } else if (newTitle !== title) {
      changeTitle(todolistId, id, currentTitle);
      setEditMode(false);
    } else {
      setEditMode(false);
    }
  };
  const updateTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTitle();
    }
  };
  const updateTitleBlurHandler = () => {
    updateTitle();
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
    changeIsDone(todolistId, id, e.currentTarget.checked);
  };
  //! ---------- change isDone current task

  return (
    <div className={isDone ? "is-done" : ""}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={onChangeDoneHandler}
        disabled={editMode}
      />
      {editMode ? (
        <>
          <input
            type={"text"}
            value={currentTitle}
            onChange={onChangeTitleHandler}
            onBlur={updateTitleBlurHandler}
            onKeyDown={updateTitleKeyDownHandler}
            autoFocus={true}
          />
          {error && <div className={"error-msg"}>{error}</div>}
        </>
      ) : (
        <>
          <span onClick={toggleEditMode}>{title}</span>
          <Button
            title={<FontAwesomeIcon icon={faXmark} />}
            callback={remove}
            disable={editMode}
            styledClass={""}
          />
        </>
      )}
    </div>
  );
}
