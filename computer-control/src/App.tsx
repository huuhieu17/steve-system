import { UserCircle } from "lucide-react";
import React from "react";
import ChatPanel from "./components/ChatPanel";
import ConnectForm from "./components/ConnectForm";
import LogConsole from "./components/LogConsole";
import PowerControl from "./components/PowerControl";
import ProcessListPanel from "./components/ProcessListPanel";
import UltilityControl from "./components/UltilityControl";
import { useWebSocket } from "./hooks/useWebSocket";


const App: React.FC = () => {
  const { closeConnection, connect, sendCommand, logs, isConnected } = useWebSocket();

  const handleConnect = (devId: string, cliId: string) => {
    connect(devId, cliId);
    // ❌ không set tab ở đây nữa, chờ effect bên trên xử lý khi isConnected = true
  };


  return (
    <div className="font-display antialiased text-slate-900 dark:text-slate-100 bg-dark min-h-screen flex flex-col">
      {/* --- Tabs header --- */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-border-dark px-4 lg:px-10 py-3 bg-background-light dark:bg-background-dark/95 backdrop-blur-sm">
        <div className="flex items-center gap-4 text-slate-900 dark:text-white">
          <div className="size-8 text-primary">
            <span className="material-symbols-outlined text-[32px]"></span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">Remote Manager</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-medium text-green-500">System Online</span>
          </div>
          {isConnected && (
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm" onClick={closeConnection} >
              Disconnect
            </button>
          )}
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9" data-alt="User profile avatar gradient" >
            <UserCircle size={36} />
          </div>
        </div>
      </header>

      {!isConnected ? (
        <ConnectForm
          onConnect={handleConnect}
          closeConnection={closeConnection}
          isConnected={isConnected}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 shadow">

          <div className="lg:col-span-3 flex flex-col gap-4">
            <PowerControl onSend={(type, payload) => sendCommand(type, payload)} />
            <UltilityControl onSend={(type, payload) => sendCommand(type, payload)} />
          </div>

          <ChatPanel />

          <ProcessListPanel onSendCommand={sendCommand} />
        </div>
      )}


      {/* --- Console luôn hiển thị --- */}
      <div className="w-full">
        <LogConsole logs={logs} />
      </div>
    </div>
  );
}


export default App;
