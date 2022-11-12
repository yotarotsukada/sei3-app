import { FC } from "react";
import { trpc } from "../utils/trpc";

type Props = {
  messages: { name: string; message: string }[];
  isLoading: boolean;
};

export const Messages: FC<Props> = ({ messages, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <p>Fetching messages...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {messages?.map((message, index) => (
            <div key={index}>
              <p>{message.message}</p>
              <span>{message.name}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
