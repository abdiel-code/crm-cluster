const MessageBox = ({ messagesList }) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {messagesList.map((message) => (
        <div
          key={message.id}
          className="flex flex-col gap-1 border p-2 rounded"
        >
          <p className="text-sm">{message.message}</p>
          <p className="text-xs text-gray-500">{message.timestamp}</p>
          <p className="text-xs text-gray-500">{message.senderName}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
