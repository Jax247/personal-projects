import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Hospital" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div onClick={logout} className="icon1__inner">
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text"> PageMe</p>
  </div>
);

const customChannelFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};
const customMsgChannelFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({
  isCreatingChannel,
  setIsCreatingChannel,
  setCreateType,
  setIsEditingChannel,
  setToggleContainer,
}) => {
  const { client } = useChatContext();
  const logout = () => {
    cookies.remove("userID");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarUrl");
    cookies.remove("hashedPW");
    cookies.remove("phoneNumber");
    cookies.remove("token");

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer}/>
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreatingChannel={isCreatingChannel}
              setIsCreatingChannel={setIsCreatingChannel}
              setCreateType={setCreateType}
              setIsEditingChannel={setIsEditingChannel}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="team"
              setToggleContainer={setToggleContainer}
              setIsCreatingChannel={setIsCreatingChannel}
              setIsEditingChannel={setIsEditingChannel}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customMsgChannelFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreatingChannel={isCreatingChannel}
              setIsCreatingChannel={setIsCreatingChannel}
              setCreateType={setCreateType}
              setIsEditingChannel={setIsEditingChannel}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="messaging"
              setIsCreatingChannel={setIsCreatingChannel}
              setIsEditingChannel={setIsEditingChannel}
              setToggleContainer={setToggleContainer}
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreatingChannel,
  setIsEditingChannel,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          // isCreatingChannel={isCreatingChannel}
          setIsCreatingChannel={setIsCreatingChannel}
          setIsEditingChannel={setIsEditingChannel}
          setCreateType={setCreateType}
        />
      </div>

        <div
          className="channel-list__container-responsive"
          style={{
            left: toggleContainer ? "0%" : "-89%",
            backgroundColor: "#005fff",
          }}
        >
          <div
            className="channel-list__container-toggle"
            onClick={() => setToggleContainer((prev) => !prev)}
          >
          </div>
            <ChannelListContent
              // isCreatingChannel={isCreatingChannel}
              setIsCreatingChannel={setIsCreatingChannel}
              setIsEditingChannel={setIsEditingChannel}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
            />
        </div>
    </>
  );
};

export default ChannelListContainer;
