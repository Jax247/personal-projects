import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { Users } from "./";
import { CloseCreateChannel } from "../assets";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const change = (e) => {
    setChannelName(e.target.value);
  };
  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={change}
        placeholder="Channel name"
      />
      <p> Add Members</p>
    </div>
  );
};
const CreateChannel = ({ createType, setIsCreatingChannel }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");




  const createChannel = async (e) =>{
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name:channelName, members: selectedUsers
      })

      await newChannel.watch()

      setChannelName('')
      setIsCreatingChannel(false)
      setSelectedUsers([client.userID])
      setActiveChannel(newChannel)
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>{createType === "team" ? "Create new channel" : "Send a Message"}</p>
        <CloseCreateChannel
          isActive={true}
          setisCreating={setIsCreatingChannel}
        />
      </div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <Users setSelectedUsers={setSelectedUsers} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
      </div>
    </div>
  );
};

export default CreateChannel;
