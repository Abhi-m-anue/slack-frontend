import { createContext } from "react";

interface channelType {
    _id: string,
    name: string
}

interface myContextType {
    channels: channelType[];
    setChannels : React.Dispatch<React.SetStateAction<channelType[]>>
    selectedChannel : channelType | undefined;
    setSelectedChannel : React.Dispatch<React.SetStateAction<channelType | undefined>>
}

const initialState = {
    channels: [],
    setChannels: () => {},
    selectedChannel : {
        _id : '',
        name : ''
    },
    setSelectedChannel : () => {}
};

const ChannelContext = createContext<myContextType>(initialState);

export default ChannelContext;
