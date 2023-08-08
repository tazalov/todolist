type ButtonPT = {
  title: string;
  callback: () => void;
  styledClass?: string;
};

export function Button({ title, callback, styledClass }: ButtonPT) {
  return (
    <button onClick={callback} className={styledClass}>
      {title}
    </button>
  );
}
