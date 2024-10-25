import socket from "@/api/socket";
import ChannelContext from "@/contexts/ChannelContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SendHorizontal } from "lucide-react";

interface inputType {
  message: string;
}

interface chatType {
  senderName: string;
  senderId: string;
  text: string;
  createdAt: string;
}

const Chat = () => {
  const [chats, setChats] = useState<chatType[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedChannel } = useContext(ChannelContext);

  const chatRef = useRef<HTMLDivElement | null>(null);

  const { register, handleSubmit, reset } = useForm<inputType>();

  const onSubmit: SubmitHandler<inputType> = (data) => {
    if (selectedChannel) {
      socket.emit(
        "sendMessage",
        userName,
        userId,
        selectedChannel._id,
        data.message
      );
    }
    reset();
  };

  const navigate = useNavigate();

  const fetchChats = async (channelId: any) => {
    setLoading(true);
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/chats?channelId=${channelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChats(response.data?.chats);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    } else {
      navigate("/sign-in");
    }
  };

  // fetches chats when a channel is clicked
  useEffect(() => {
    if (selectedChannel) {
      fetchChats(selectedChannel._id);
    }
    if (selectedChannel && userId) {
      socket.emit("joinChannel", userId, selectedChannel._id);
    }
  }, [selectedChannel]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { userId, name } = JSON.parse(storedUser);
      setUserId(userId);
      setUserName(name);
    }

    socket.on("receiveMessage", (senderName, senderId, createdAt, text) => {
      setChats((prevChats) => [
        ...prevChats,
        { senderName, senderId, createdAt, text },
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <>
      <div className="w-full flex flex-col justify-end flex-grow  border-t-[1px]">
        <div className="max-h-[calc(100vh-150px)] overflow-y-scroll">
          {loading ? (
            <div className="w-10 h-10 border-4 border-gray-300 border-t-2 border-t-transparent rounded-full animate-spin my-56 mx-auto"></div>
          ) : chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full fromTop">
              <p className="text-gray-500">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            chats.map((chat, index) => {
              const date = new Date(chat.createdAt);
              return (
                <>
                  <div
                    key={index}
                    className={`flex gap-3 p-5 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent fromTop`}
                  >
                    <div
                      className={`flex-shrink-0 capitalize text-white text-sm font-semibold h-7 w-7 mt-1 rounded-full flex justify-center items-center${
                        chat.senderId === userId
                          ? " bg-violet-600"
                          : " bg-gray-200"
                      }`}
                    >
                      {chat.senderName[0]}
                    </div>
                    <div className={`rounded-lg break-words`}>
                      <div className="flex items-center gap-2">
                        <div className="font-semibold capitalize">
                          {chat.senderName}
                        </div>
                        <div className="text-xs">
                          {date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      <div className="text-sm text-black">{chat.text}</div>
                    </div>
                  </div>
                </>
              );
            })
          )}
          <div ref={chatRef}></div>
        </div>

        <form
          className="sticky bottom-0 px-4 py-2 bg-white shadow-lg flex items-center gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative flex-grow">
            <Input
              {...register("message", { required: true })}
              className="w-full p-3 pl-4 pr-12 bg-gray-100 rounded-full border border-gray-300    focus:border-none"
              placeholder="Type a message..."
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="p-2 rounded-full bg-violet-600 text-white hover:bg-violet-700 "
          >
            <SendHorizontal size={25} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
