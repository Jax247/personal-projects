import React from "react";
import { AddChannel } from "../assets";

const TeamChannelList = ({
  children,
  error = false,
  loading,
  type,
  isCreatingChannel,
  setIsCreatingChannel,
  setCreateType,
  setIsEditingChannel,
  setToggleContainer
}) => {
  if (error) {
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection Error, Wait and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === "team" ? "Channels" : "Messages"} loading..
        </p>
      </div>
    ) : null;
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === "team" ? "Channels" : "Direct Messages"}
        </p>
        <AddChannel
          isCreating={isCreatingChannel}
          setIsCreating={setIsCreatingChannel}
          setCreateType={setCreateType}
          setIsEditing={setIsEditingChannel}
          type={type === "team" ? "team": 'messaging'}
          setToggleContainer={setToggleContainer}
          // className="rotate"
        />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
