import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
    receiveMessage : (senderName : string,senderId : string,createdAt : string,text : string) => void;
  }
  
  interface ClientToServerEvents {
    joinChannel : (userId : string, channelId : string) => void;
    sendMessage : (senderName : string,senderId : string, channelId : string,text : string) => void;
  }
  

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`${import.meta.env.VITE_API_URL}`);

export default socket