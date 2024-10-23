import React, { useState } from "react";
import ChannelContext from "./ChannelContext";

interface channelType {
    _id: string;
    name: string;
}

interface Props {
    children: React.ReactNode;
}

const ChannelContextProvider = (props: Props) => {
    const [channels,setChannels] = useState<channelType[]>([])
    const [selectedChannel, setSelectedChannel] = useState<channelType | undefined>()

    return (
        <ChannelContext.Provider value={{ channels, setChannels, selectedChannel, setSelectedChannel }}>
            {props.children}
        </ChannelContext.Provider>
    );
};

export default ChannelContextProvider;