import socket from "@/api/socket";
import ChannelContext from "@/contexts/ChannelContext";
import { useContext, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const { selectedChannel } = useContext(ChannelContext);

  const { register, handleSubmit, reset } = useForm<inputType>();

  const onSubmit: SubmitHandler<inputType> = (data) => {
    if(selectedChannel){
        socket.emit('sendMessage',userName,userId,selectedChannel._id,data.message)
    }
    reset();
  };

  const navigate = useNavigate();

  const fetchChats = async (channelId: any) => {
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
      setUserName(name)
    }

    socket.on('receiveMessage',(senderName, senderId, createdAt, text)=>{
        setChats((prevChats) => [
            ...prevChats,
            { senderName, senderId, createdAt, text }
          ]);
    })

    return ()=>{
        socket.off('receiveMessage')
    }
  },[]);

  return (
    <>
      <div className="mx-auto w-full max-w-3xl rounded-xl bg-muted/50 flex flex-col justify-end">
        <div className="max-h-[calc(100vh-200px)] overflow-y-scroll">
          {chats.map((chat,index) => (
            <div
              key={index}
              className={`flex ${
                chat.senderId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  chat.senderId === userId
                    ? "bg-green-200 text-right"
                    : "bg-gray-200 text-left"
                } max-w-xs break-words`}
              >
                <div className="font-semibold">{chat.senderName}</div>
                <div>{chat.text}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          className="sticky bottom-0 bg-white p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row gap-4">
            <Input
              {...register("message", { required: true })}
              className="flex-grow"
              autoComplete="off"
            ></Input>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
