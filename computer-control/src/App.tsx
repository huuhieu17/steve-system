import React, { useState, useEffect } from "react";
import ConnectForm from "./components/ConnectForm";
import ChatPanel from "./components/ChatPanel";
import CommandPanel from "./components/CommandPanel";
import LogConsole from "./components/LogConsole";
import { useWebSocket } from "./hooks/useWebSocket";
import ProcessListPanel from "./components/ProcessListPanel";

const tabs = [
  { id: "connect", label: "Connect" },
  { id: "command", label: "Commands", requiresConnection: true },
  { id: "chat", label: "Chat", requiresConnection: true },
  { id: "processes", label: "Processes", requiresConnection: true },
];

const App: React.FC = () => {
  const { closeConnection, connect, sendChat, sendCommand, logs, isConnected } = useWebSocket();
  const [activeTab, setActiveTab] = useState("connect");

  // ✅ Khi kết nối thành công thì tự động chuyển tab sang "command"
  useEffect(() => {
    if (isConnected) {
      setActiveTab("command");
    }
  }, [isConnected]);

  const handleConnect = (devId: string, cliId: string) => {
    connect(devId, cliId);
    // ❌ không set tab ở đây nữa, chờ effect bên trên xử lý khi isConnected = true
  };

  const handleTabClick = (tabId: string, requiresConnection?: boolean) => {
    if (requiresConnection && !isConnected) return; // không cho click khi chưa connect
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* --- Tabs header --- */}
      <div className="flex space-x-4 border-b border-gray-300 mb-2">
        {tabs.map((tab) => {
          const disabled = tab.requiresConnection && !isConnected;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.requiresConnection)}
              disabled={disabled}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* --- Tab contents --- */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-4 mb-4">
        {activeTab === "connect" && (
          <ConnectForm
            onConnect={handleConnect}
            closeConnection={closeConnection}
            isConnected={isConnected}
          />
        )}

        {activeTab === "command" && isConnected && (
          <CommandPanel onSend={(type, payload) => sendCommand(type, payload)} />
        )}

        {activeTab === "chat" && isConnected && <ChatPanel onSend={(msg) => sendChat(msg)} />}

        {activeTab === "processes" && isConnected && (
          <ProcessListPanel onSendCommand={sendCommand} />
        )}
      </div>

      {/* --- Console luôn hiển thị --- */}
      <div className="w-full max-w-3xl">
        <LogConsole logs={logs} />
      </div>
    </div>
  );
};

export default App;
