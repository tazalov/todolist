type ButtonPT = {
  title: string;
  callback: () => void;
  styledClass?: string;
  disable?: boolean;
};

export function Button({ title, callback, styledClass, disable }: ButtonPT) {
  return (
    <button onClick={callback} className={styledClass} disabled={disable}>
      {title}
    </button>
  );
}
