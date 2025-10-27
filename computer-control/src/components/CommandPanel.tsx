import { useWebSocket } from "@/hooks/useWebSocket";
import React, { useState } from "react";

interface CommandPanelProps {
  onSend: (cmd_type: string, payload: Record<string, any>) => void;
}

const CommandPanel: React.FC<CommandPanelProps> = ({ onSend }) => {
  const [customShell, setCustomShell] = useState("");
  const { clientId } = useWebSocket();

  const sendCommand = (payload: Record<string, any> = {}) => {
    onSend("command", payload);
  };

  const sendShell = (payload: Record<string, any> = {}) => {
    onSend("command", payload);
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 space-y-6 w-full max-w-md mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
        Command Center
      </h2>

      {/* Nút điều khiển cơ bản */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => sendCommand({ cmd_type: "shutdown" })}
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 font-medium"
        >
          🔴 Shutdown
        </button>
        <button
          onClick={() => sendCommand({ cmd_type: "restart" })}
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg py-2 font-medium"
        >
          🔄 Restart
        </button>
        <button
          onClick={() =>
            sendCommand({ cmd_type: "screenshot", reply_to: clientId })
          }
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 font-medium col-span-2"
        >
          📸 Screenshot
        </button>
      </div>

      {/* Shell Command */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          💻 Gửi lệnh Shell
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ví dụ: ls -la"
            value={customShell}
            onChange={(e) => setCustomShell(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-indigo-300 focus:outline-none"
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
      </div>
    </div>
  );
};

export default CommandPanel;
