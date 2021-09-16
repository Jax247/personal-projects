import React, {useState} from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelContainer, ChannelListContainer, Auth } from "./components";
import './styles/App.css';
import 'stream-chat-react/dist/css/index.css'

const API_KEY = "54ah33xdnaxq"; // Stream API
const client = StreamChat.getInstance(API_KEY);
const cookies = new Cookies();
const Authenticated = cookies.get('token'); // Auth token


if (Authenticated) {
  try{
    client.connectUser({
      id: cookies.get("userID"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarUrl"),
      hashedPW: cookies.get("hashedPW"),
      phoneNumber: cookies.get("phoneNumber"),
    }, Authenticated);
  }catch (e){
    // Authenticated = "";
    console.log(e)
  }
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);
  const [isEditingChannel, setIsEditingChannel] = useState(false);

  if (!Authenticated) 
    return <Auth />
  
  return (
    <div className="app__wrapper">
      <Chat client={client} theme={"team light"}>
        <ChannelListContainer 
          isCreatingChannel={isCreatingChannel}
          setIsCreatingChannel={setIsCreatingChannel}
          setCreateType={setCreateType}
          setIsEditingChannel={setIsEditingChannel}
        />

        <ChannelContainer 
          isCreatingChannel={isCreatingChannel}
          setIsCreatingChannel={setIsCreatingChannel}
          isEditingChannel={isEditingChannel}
          setIsEditingChannel={setIsEditingChannel}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
