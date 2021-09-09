import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { Cookies } from "universal-cookie";
import { ChannelContainer, ChannelListContainer, Auth } from "./components";
import './styles/App.css'

const API_KEY = "54ah33xdnaxq"; // Stream API
const client = StreamChat.getInstance(API_KEY);
const Authenticated = false;

const App = () => {

  if (!Authenticated) 
    return <Auth />
  
  return (
    <div className="app__wrapper">
      <Chat client={client} theme={"team dark"}>
        <ChannelListContainer />

        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
