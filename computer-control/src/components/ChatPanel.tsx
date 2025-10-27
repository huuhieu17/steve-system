import React, { useState } from "react";

interface Props {
  onSend: (msg: string) => void;
}

const ChatPanel: React.FC<Props> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-md w-full mt-4">
      <h3 className="font-semibold mb-2">💬 Chat</h3>
      <div className="flex gap-2">
        <input
          className="border flex-1 px-2 py-1 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={() => {
            onSend(message);
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
