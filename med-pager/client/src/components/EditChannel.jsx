import React, {useState} from 'react'
import {useChatContext} from 'stream-chat-react'

import {Users } from './'
import {CloseCreateChannel} from '../assets'

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

const EditChannel = ({setIsEditingChannel}) => {

    const {channel} = useChatContext()
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUsers, setSelectedUsers] = useState([]);


    const saveChanges = async (e) => {
        e.preventDefault();

        const nameChanged = channelName !== (channel?.data?.name || channel?.data?.id)

        if (nameChanged) {
            await channel.update({name:channelName}, {text: `Channel name changed to ${channelName}`})
        }
        if(selectedUsers.length) {
            await channel.addMembers(selectedUsers)
        }

        // reset everything after
        setChannelName(null)
        setIsEditingChannel(false)
        setSelectedUsers([])
    }

    return (
        <div className="edit-channel__container">
        <div className="edit-channel__header">
            <p>Edit Channel</p>
            <CloseCreateChannel setIsEditingChannel={setIsEditingChannel}/>
        </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
            <Users setSelectedUsers={setSelectedUsers}/>
            <div className="edit-channel__button-wrapper" onClick={saveChanges}>
                <p>Save</p>
            </div>
        </div>
    )
}

export default EditChannel
