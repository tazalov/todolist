import React, { ChangeEvent } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../common/button/Button";
import { EditableSpan } from "../common/editableSpan/EditableSpan";

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
  //! ---------- change isDone current task
  const onChangeDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeIsDone(todolistId, id, e.currentTarget.checked);
  };
  //! ---------- change isDone current task

  //! ---------- change title current task
  const changeCurrentTitle = (newTitle: string) => {
    changeTitle(todolistId, id, newTitle);
  };
  //! ---------- change title current task

  return (
    <div className={isDone ? "is-done" : ""}>
      <input type="checkbox" checked={isDone} onChange={onChangeDoneHandler} />
      <EditableSpan title={title} changeTitle={changeCurrentTitle} />
      <Button
        title={<FontAwesomeIcon icon={faXmark} />}
        callback={remove}
        styledClass={""}
      />
    </div>
  );
}
