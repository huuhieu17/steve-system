import { useWebSocket } from "@/hooks/useWebSocket";
import { Link, Power, Terminal } from "lucide-react";
import React, { useState } from "react";

interface Props {
  onConnect: (deviceId: string, clientId: string) => void;
  isConnected: boolean;
  closeConnection: () => void;
}

const ConnectForm: React.FC<Props> = ({ onConnect, isConnected }) => {
  const {logs } = useWebSocket();
  const [deviceId, setDeviceId] = useState("");
  const [clientId,] = useState(() => "controller-" + crypto.randomUUID().slice(0, 8));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(deviceId, clientId);
  };

  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-4 flex flex-col gap-6">
      {/* <!-- Page Heading --> */}
      <div className="flex flex-col gap-2 mb-2">
        <h1 className="text-xl md:text-2xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white">Kết nối thiết bị</h1>
        <p className="text-slate-500 dark:text-[#9da8b9] text-base font-normal">Điều khiển thiết bị từ xa và quản lý các lệnh thực thi</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full flex-1">
        {/* <!-- LEFT COLUMN: Controls --> */}
        <form onSubmit={handleSubmit} className="lg:col-span-4 flex flex-col gap-3">
          {/* <!-- Connection Control --> */}
          <div className="bg-white dark:bg-[#1c2027] rounded-xl border border-gray-200 dark:border-[#282f39] p-3 shadow-sm flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">
                  <Link />
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Kết nối với thiết bị</h3>
            </div>
             <label className="flex flex-col w-full mb-3">
              <p className="text-slate-700 dark:text-white text-sm font-medium leading-normal pb-2">ID Thiết bị của bạn</p>
              <div className="flex w-full items-stretch rounded-lg group">
                <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border border-gray-300 dark:border-[#3b4554] bg-gray-50 dark:bg-[#111418] h-12 px-4 text-base font-mono font-medium leading-normal tracking-wide" readOnly value={clientId || "Chưa có ID thiết bị"}   />
              </div>
            </label>
            <div className="flex flex-col gap-4 flex-1">
              <label className="flex flex-col w-full">
                <p className="text-slate-700 dark:text-white text-sm font-medium leading-normal pb-2">Client ID</p>
                <input className="flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-[#3b4554] bg-transparent dark:bg-[#111418] h-12 px-4 placeholder:text-gray-400 dark:placeholder:text-[#9da8b9] text-base font-normal leading-normal transition-all" placeholder="Enter Client ID..." value={deviceId} onChange={(e) => setDeviceId(e.target.value)} />
              </label>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#111418] border border-dashed border-gray-300 dark:border-[#3b4554]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-[#9da8b9]">Trạng thái</span>
                  {isConnected ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-200 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wide">
                      <span className="size-2 rounded-full bg-green-400 dark:bg-green-500 animate-pulse"></span>
                      Đã kết nối
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-200 dark:bg-[#282f39] text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-wide">
                      <span className="size-2 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                      Ngắt kết nối
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-[#9da8b9]">Protocol</span>
                  <span className="text-sm font-mono text-slate-900 dark:text-white">SSH/WSS</span>
                </div>
              </div>
              <div className="mt-auto pt-2">
                <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-blue-500 hover:bg-blue-600 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-blue-900/20">
                  <span className="material-symbols-outlined mr-2 text-[20px]">
                    <Power />
                  </span>
                  <span className="truncate">Kết nối</span>
                </button>
              </div>
            </div>
          </div>
        </form>
        {/* <!-- RIGHT COLUMN: Command History / Terminal --> */}
        <div className="lg:col-span-8 h-[300px] lg:h-auto min-h-[300px] flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-[#282f39] bg-[#0d1216] shadow-2xl">
          {/* <!-- Terminal Header --> */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1c2027] border-b border-[#282f39]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9da8b9] text-[20px]"><Terminal /></span>
              <span className="text-white font-bold text-sm tracking-wide">Command History</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-[#ff5f56]"></div>
                <div className="size-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="size-3 rounded-full bg-[#27c93f]"></div>
              </div>
            </div>
          </div>
          {/* <!-- Terminal Body --> */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar font-mono text-sm leading-relaxed relative">
            <div className="flex flex-col gap-3">
              {logs.map((l, i) => (
                <div
                  key={i}
                  className="text-white mb-1"
                  dangerouslySetInnerHTML={{ __html: l }}
                />
              ))}
            </div>
            {/* <!-- Scroll anchor --> */}
            <div className="h-4"></div>
          </div>
          {/* <!-- Terminal Input Area --> */}
          <div className="p-3 bg-[#1c2027] border-t border-[#282f39]">
            <div className="flex items-center gap-2">
              <span className="text-[#27c93f] font-bold select-none">&gt;</span>
              <input className="w-full bg-transparent border-none text-white font-mono text-sm focus:ring-0 placeholder:text-gray-600" placeholder="Type a command to execute manually..." type="text" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )

};

export default ConnectForm;
