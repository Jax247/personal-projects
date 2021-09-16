import React from "react";
import { Channel, useChatContext, MessageTeam } from "stream-chat-react";

import { ChannelInner, CreateChannel, EditChannel, CustomMessage } from "./";

const ChannelContainer = ({
  isCreatingChannel,
  setIsCreatingChannel,
  isEditingChannel,
  setIsEditingChannel,
  createType,
}) => {
  const { channel } = useChatContext();

  if (isCreatingChannel) {
    return (
      <div className="channel__container">
        <CreateChannel
          createType={createType}
          setIsCreatingChannel={setIsCreatingChannel}
        />
      </div>
    );
  }
  if (isEditingChannel) {
    return (
      <div className="channel__container">
        <EditChannel
          createType={createType}
          setIsEditingChannel={setIsEditingChannel}
        />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">Beginning of chat</p>
      <p className="channel-empty__second">
        {" "}
        Send messages, attachments, links emojis, and more
      </p>
    </div>
  );

  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        message={(messageProps, index) => (
          // <MessageTeam key={index} {...messageProps} />
          <CustomMessage/>
        )}
      >
        <ChannelInner setIsEditingChannel={setIsEditingChannel} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
