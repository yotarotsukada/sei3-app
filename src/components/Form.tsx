import { FC } from "react";

type Props = {
  message: string;
  setMessage: (value: string) => void;
  handleSubmit: () => void;
  isSending: boolean;
};

export const Form: FC<Props> = ({
  message,
  setMessage,
  handleSubmit,
  isSending,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        minLength={2}
        maxLength={100}
        className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="w-32 rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
      >
        {isSending ? "..." : "Submit"}
      </button>
    </form>
  );
};
