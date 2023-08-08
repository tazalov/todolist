import { ReactNode } from "react";

type ButtonPT = {
  title: string | ReactNode;
  callback: () => void;
  disable?: boolean;
  styledClass: string;
};

export function Button({ title, callback, disable, styledClass }: ButtonPT) {
  return (
    <button onClick={callback} disabled={disable} className={styledClass}>
      {title}
    </button>
  );
}
