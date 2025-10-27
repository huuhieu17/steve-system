import React from "react";
import ConnectForm from "./components/ConnectForm";
import ChatPanel from "./components/ChatPanel";
import CommandPanel from "./components/CommandPanel";
import LogConsole from "./components/LogConsole";
import { useWebSocket } from "./hooks/useWebSocket";

const App: React.FC = () => {
  const { closeConnection, connect, sendChat, sendCommand, logs, isConnected } = useWebSocket();


  const handleConnect = (devId: string, cliId: string) => {
    connect(devId, cliId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <ConnectForm onConnect={handleConnect} closeConnection={closeConnection} isConnected={isConnected} />
      {isConnected && (
        <>
          <CommandPanel onSend={(type, payload) => sendCommand(type, payload)} />
          <ChatPanel onSend={(msg) => sendChat(msg)} />
        </>
      )}
      <LogConsole logs={logs} />
    </div>
  );
};

export default App;
