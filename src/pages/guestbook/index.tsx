import { signIn, signOut, useSession } from "next-auth/react";
import { FC, useState } from "react";
import { Form } from "../../components/Form";
import { Messages } from "../../components/Messages";
import { trpc } from "../../utils/trpc";

const Home: FC = () => {
  const { data: session, status } = useSession();

  const utils = trpc.useContext();

  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const postMessages = trpc.guestbook.postMessage.useMutation({
    onMutate: () => {
      utils.guestbook.getAll.cancel();
      const optimisticUpdate = utils.guestbook.getAll.getData();
      if (optimisticUpdate) {
        utils.guestbook.getAll.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.guestbook.getAll.invalidate();
      setIsSending(false);
    },
  });

  const handleSubmit = () => {
    setIsSending(true);
    postMessages.mutate({
      name: "hoge",
      message,
    });
    setMessage("");
  };

  return (
    <main className="items-centers mx-[10%] flex flex-col">
      {status === "loading" ? (
        <p className="pt-4">...Loading</p>
      ) : (
        <>
          <h1 className="pt-4 text-3xl">Guestbook</h1>
          <p>
            Tutorial for <code>create-t3-app</code>
          </p>
          <div className="pt-6">
            <Form {...{ message, setMessage, handleSubmit, isSending }} />
          </div>
          <div className="pt-10">
            {session ? (
              <div>
                <p>hi {session.user?.name}</p>
                <button onClick={() => signOut()}>Logout</button>
              </div>
            ) : (
              <button onClick={() => signIn("discord")}>
                Login with Discord
              </button>
            )}
            <div className="pt-10">
              {!!messages && <Messages {...{ messages, isLoading }} />}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
