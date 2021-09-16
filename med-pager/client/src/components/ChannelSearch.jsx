import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { Dropdown } from "./";

import { SearchIcon } from "../assets";

const ChannelSearch = ({ setToggleContainer }) => {
  const [searchText, changeText] = useState("");
  const [loading, setLoading] = useState(false);
  const { client, setActiveChannel } = useChatContext();
  const [teamChannels, setTeamChannels] = useState([]);
  const [dmChannels, setDMChannels] = useState([]);

  useEffect(() => {
    if (!searchText) {
      setTeamChannels([]);
      setDMChannels([]);
    }
  }, [searchText]);

  const onType = (e) => {
    e.preventDefault();

    setLoading(true);
    changeText(e.target.value);

    getChannelList(e.target.value);
  };

  const getChannelList = async (text) => {
    try {
      const channelRes = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });

      const userRes = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });

      const [channels, { users }] = await Promise.all([channelRes, userRes]);

      if (channels.length) setTeamChannels(channels);
      if (users.length) setDMChannels(users);
    } catch (error) {
      changeText("");
    }
  };

  const setChannel = (channel) => {
    changeText("");
    setActiveChannel(channel);
  };

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          placeholder="Search Channel"
          type="text"
          value={searchText}
          onChange={onType}
        />
      </div>
      {searchText && (
        <Dropdown
          teamChannels={teamChannels}
          dmChannels={dmChannels}
          loading={loading}
          setChannel={setChannel}
          setText={changeText}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
