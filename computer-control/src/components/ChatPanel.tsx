import { useWebSocket } from "@/hooks/useWebSocket";
import React, { useState } from "react";

interface Props {
}

const ChatPanel: React.FC<Props> = () => {
  const [message, setMessage] = useState("");
  const [customShell, setCustomShell] = useState("");
  const { sendCommand, sendChat } = useWebSocket();

  const sendShell = (payload: Record<string, any> = {}) => {
    sendCommand("command", payload);
  };

  return (
    <div className="lg:col-span-5">
      <section className="flex flex-col bg-white dark:bg-[#1c2027] rounded-xl p-4 shadow-xl border border-gray-200 dark:border-[#282f39]">
        <h3 className="text-lg font-semibold mb-2">💬 Gửi tin nhắn</h3>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
          />
          <button
            className="bg-blue-500 text-white px-4 rounded"
            onClick={() => {
              sendChat(message);
              setMessage("");
            }}
          >
            Gửi
          </button>
        </div>
      </section>
      <section className="mt-4 bg-white dark:bg-[#1c2027] rounded-xl p-4 shadow-xl border border-gray-200 dark:border-[#282f39]">
        <h3 className="text-lg font-semibold mb-2">💻 Custom Shell</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ví dụ: ipconfig /all"
            value={customShell}
            onChange={(e) => setCustomShell(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <button
            onClick={() => {
              if (customShell.trim()) {
                sendShell({ cmd_type: "shell", command: customShell });
                setCustomShell("");
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg"
          >
            Gửi
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChatPanel;
