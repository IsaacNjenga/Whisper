import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { Input } from "antd";
import SearchResults from "./searchResults";
const { Search } = Input;
function ChatSearch() {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    } else {
      getChannels(query);
    }
  }, [query]);

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });
      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });

      const [channels, { users }] = await Promise.all([
        channelResponse,
        userResponse,
      ]);

      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (error) {
      setQuery("");
    }
  };

  const onSearch = (value) => {
    setLoading(true);
    setQuery(value);
    getChannels(value);
  };

  const setChannel = (channel) => {
    setQuery("");
    setActiveChannel(channel);
  };

  return (
    <div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        enterButton
      />
      {query && (
        <SearchResults
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setActiveChannel}
          setQuery={setQuery}
        />
      )}
    </div>
  );
}

export default ChatSearch;
