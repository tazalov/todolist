type ButtonPT = {
  title: string;
  callback: () => void;
  type: "red" | "green" | "aquamarine";
};

export function Button({ title, callback, type }: ButtonPT) {
  return (
    <button
      style={{
        backgroundColor: type,
        padding: "5px 10px",
      }}
      onClick={callback}
    >
      {title}
    </button>
  );
}
