import React from "react";
import { useChatContext } from "stream-chat-react";
import { Avatar, Typography } from "antd";
import "../assets/css/searchResults.css";
import { UserOutlined } from "@ant-design/icons";
const { Text } = Typography;

const channelByUser = async ({
  client,
  setActiveChannel,
  channel,
}) => {
  const filters = {
    type: "messaging",
    member_count: 2,
    members: { $in: [client.user.id, client.userID] },
  };

  const [existingChannel] = await client.queryChannels(filters);

  if (existingChannel) return setActiveChannel(existingChannel);

  const newChannel = client.channel("messaging", {
    members: [channel.id, client.userID],
  });
  await newChannel.watch(); 
  setActiveChannel(newChannel);

  return setActiveChannel(newChannel);
};

const SearchResult = ({ channel, focusedId, type, setChannel }) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === "channel") {
    return (
      <div
        onClick={() => {
          setChannel(channel);
        }}
        className={
          focusedId === channel.id
            ? "channel-search__result-container__focused"
            : "channel-search__result-container"
        }
      >
        <div className="result-hashtag">#</div>
        <p className="channel-search__result-text">{channel.data.name}</p>
      </div>
    );
  }

  return (
    <div
      onClick={async () => {
        channelByUser({ client, setActiveChannel, channel, setChannel });
      }}
      className={
        focusedId === channel.id
          ? "channel-search__result-container__focused"
          : "channel-search__result-container"
      }
    >
      <div className="channel-search__result-user">
        <Avatar
          src={channel.image || undefined}
          icon={<UserOutlined />}
          size={32}
          className="direct-avatar"
        />{" "}
        <Text className="direct-username">{channel.name}</Text>
      </div>
    </div>
  );
};

function SearchResults({
  teamChannels,
  directChannels,
  focusedId,
  loading,
  setChannel,
}) {
  return (
    <div className="channel-search__results">
      <p className="channel-search__results-header">Channels</p>
      {loading && !teamChannels.length && (
        <p className="channel-search__results-header">
          <i>Loading...</i>
        </p>
      )}
      {!loading && !teamChannels.length ? (
        <p className="channel-search__results-header">
          <i>No channels found</i>
        </p>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type="channel"
          />
        ))
      )}
      <p className="channel-search__results-header">Users</p>
      {loading && !directChannels.length && (
        <p className="channel-search__results-header">
          <i>Loading...</i>
        </p>
      )}
      {!loading && !directChannels.length ? (
        <p className="channel-search__res ults-header">
          <i>No direct messages found</i>
        </p>
      ) : (
        directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type="user"
          />
        ))
      )}
    </div>
  );
}

export default SearchResults;
