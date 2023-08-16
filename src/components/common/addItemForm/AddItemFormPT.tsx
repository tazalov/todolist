import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type AddItemFormPT = {
  addItem: (title: string) => void;
};

export function AddItemForm({ addItem }: AddItemFormPT) {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  //! ---------- handler for input value
  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setError("");
  };
  //! ---------- handler for input value

  //! ---------- add item with validate
  const addNewItem = () => {
    const newTitle = title.trim();
    if (!newTitle.length) {
      setError("Value can't be empty");
    } else {
      setTitle("");
      addItem(newTitle);
    }
  };
  //! ---------- add item with validate

  //! ---------- handlers for add item
  const addItemHandler = () => {
    addNewItem();
  };
  const addItemKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewItem();
    }
  };
  //! ---------- handlers for add item

  //! ---------- change error msg
  const onBlurTitleHandler = () => {
    setError("");
  };
  //! ---------- change error msg

  return (
    <div>
      <div>
        <input
          type={"text"}
          value={title}
          onChange={changeTitleHandler}
          onKeyDown={addItemKeyDownHandler}
          onBlur={onBlurTitleHandler}
        />
        <Button
          title={<FontAwesomeIcon icon={faPlus} />}
          callback={addItemHandler}
          styledClass={""}
        />
      </div>
      {error && <div className={"error-msg"}>{error}</div>}
    </div>
  );
}
