import React, { useState } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";

interface CommandPanelProps {
  onSend: (cmd_type: string, payload: Record<string, any>) => void;
}

const CommandPanel: React.FC<CommandPanelProps> = ({ onSend }) => {
  const [customShell, setCustomShell] = useState("");
  const [killTarget, setKillTarget] = useState("");
  const { clientId } = useWebSocket();

  const sendCommand = (payload: Record<string, any> = {}) => {
    onSend("command", payload);
  };

  const sendShell = (payload: Record<string, any> = {}) => {
    onSend("command", payload);
  };

  return (
    <div className="bg-white shadow-xl rounded-xl space-y-8 p-2 w-full mx-auto border border-gray-200">
      {/* --- Power Controls --- */}
      <section>
        <h3 className="text-lg font-semibold mb-2">⚡ Power Control</h3>
        <div className="flex flex-wrap space-x-2">
          <button
            onClick={() => sendCommand({ cmd_type: "shutdown" })}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 px-3 font-medium"
          >
            🔴 Shutdown
          </button>
          <button
            onClick={() => sendCommand({ cmd_type: "restart" })}
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg py-2 px-3 font-medium"
          >
            🔄 Restart
          </button>
          <button
            onClick={() => sendCommand({ cmd_type: "lock" })}
            className="bg-gray-700 hover:bg-gray-800 text-white rounded-lg py-2 px-3 font-medium"
          >
            🔒 Lock
          </button>
        </div>
      </section>

      {/* --- Network Controls --- */}
      <section>
        <h3 className="text-lg font-semibold mb-2">🌐 Network</h3>
        <div className="flex flex-wrap space-x-2">
          <button
            onClick={() => sendCommand({ cmd_type: "enable_wifi" })}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 px-3 font-medium"
          >
            📶 Enable Wi-Fi
          </button>
          <button
            onClick={() => sendCommand({ cmd_type: "disable_wifi" })}
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-3 font-medium"
          >
            🚫 Disable Wi-Fi
          </button>
          <button
            onClick={() => sendCommand({ cmd_type: "enable_bluetooth" })}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-3 font-medium"
          >
            🟦 Enable Bluetooth
          </button>
          <button
            onClick={() => sendCommand({ cmd_type: "disable_bluetooth" })}
            className="bg-blue-400 hover:bg-blue-500 text-white rounded-lg py-2 px-3 font-medium"
          >
            ⬛ Disable Bluetooth
          </button>
        </div>
      </section>

      {/* --- Process Control --- */}
      <section>
        <h3 className="text-lg font-semibold mb-2">🧠 Process Control</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => sendCommand({ cmd_type: "get_list_process" })}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 px-3 font-medium"
          >
            📋 Get Process List
          </button>

          <div className="flex space-x-2 mt-2 w-full">
            <input
              type="text"
              placeholder="Nhập tên app để kill (VD: chrome)"
              value={killTarget}
              onChange={(e) => setKillTarget(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-purple-300 focus:outline-none"
            />
            <button
              onClick={() => {
                if (killTarget.trim()) {
                  sendCommand({ cmd_type: "kill_app", target: killTarget });
                  setKillTarget("");
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg"
            >
              💀 Kill App
            </button>
          </div>
        </div>
      </section>

      {/* --- Screenshot --- */}
      <section>
        <h3 className="text-lg font-semibold mb-2">📸 Screen Capture</h3>
        <button
          onClick={() =>
            sendCommand({ cmd_type: "screenshot", reply_to: clientId })
          }
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 font-medium"
        >
          📷 Take Screenshot
        </button>
      </section>

      {/* --- Shell Command --- */}
      <section>
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

export default CommandPanel;
