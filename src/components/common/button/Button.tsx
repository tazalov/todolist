type ButtonPT = {
  title: string;
  callback: () => void;
};

export function Button({ title, callback }: ButtonPT) {
  return <button onClick={callback}>{title}</button>;
}
