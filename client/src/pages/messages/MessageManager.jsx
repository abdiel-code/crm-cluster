import { useAuth } from "../../context/AuthContext.jsx";
import { useTeam } from "../../context/TeamContext.jsx";
import { useState } from "react";
import MessageBox from "../../components/messages/MessageBox.jsx";
import useMessageManager from "../../hooks/messages/useMessageManager.js";
import { handleSendMessage } from "../../hooks/messages/useMessageActions.js";
import { v4 as uuidv4 } from "uuid";

const MessageManager = () => {
  const { user } = useAuth();
  const { activeTeam: team } = useTeam();
  const { messages, setMessages } = useMessageManager();

  const [messageData, setMessageData] = useState({ message: "" });

  const handleChange = (e) => {
    const { value } = e.target;
    setMessageData({ message: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageData.message.trim()) return;

    const newMessage = {
      id: uuidv4(),
      message: messageData.message,
      timestamp: new Date().toLocaleString(),
      senderId: user.id,
      senderName: user.name,
      teamId: team.team_id,
    };

    const response = await handleSendMessage(newMessage);

    if (response) {
      setMessages((prev) => [...prev, newMessage]);
      setMessageData({ message: "" });
    }

    console.log("After sending message:", messages);
  };

  if (!team?.team_id) return <div>No team selected</div>;

  return (
    <div>
      <h1>Message Manager</h1>
      <h2>Team: {team.team_name}</h2>
      <MessageBox messagesList={messages} />
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          value={messageData.message}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageManager;
