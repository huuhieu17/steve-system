import { ChevronRight, Lock, Power, PowerOff, RotateCcw } from "lucide-react";
import React from "react";

interface PowerControlProps {
  onSend: (cmd_type: string, payload: Record<string, any>) => void;
}

const PowerControl: React.FC<PowerControlProps> = ({ onSend }) => {
  const sendCommand = (payload: Record<string, any> = {}) => {
    onSend("command", payload);
  };


  return (
    <div className="bg-white dark:bg-[#1c2027] rounded-xl p-3 shadow-xl border border-gray-200 dark:border-[#282f39]">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
          <Power size={20} />
        </div>
        <h3 className="text-lg font-bold">Power Control</h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <button 
          onClick={() => sendCommand({ cmd_type: "shutdown" })}
          className="group flex items-center text-red-500 justify-between w-full p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all border border-red-500 hover:border-red-600">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-red-500 group-hover:text-white">
              <PowerOff />
            </span>
            <span className="font-semibold ">Tắt máy</span>
          </div>
          <span className="material-symbols-outlined text-red-500 group-hover:text-white/80">
            <ChevronRight />
          </span>
        </button>
        <button 
          onClick={() => sendCommand({ cmd_type: "restart" })}
          className="group flex items-center justify-between w-full p-2 rounded-lg hover:bg-orange-500 text-orange-500 hover:text-white transition-all border border-orange-500 hover:border-orange-600">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-orange-500 group-hover:text-white">
              <RotateCcw />
            </span>
            <span className="font-semibold">Khởi động lại</span>
          </div>
          <span className="material-symbols-outlined text-orange-500 group-hover:text-white/80">
            <ChevronRight />
          </span>
        </button>
        <button className="group flex items-center justify-between w-full p-2 rounded-lg hover:bg-blue-700 text-blue-600 hover:text-white transition-all border border-blue-600 hover:border-blue-600">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined group-hover:text-white">
              <Lock />
            </span>
            <span className="font-semibold">Khóa màn hình</span>
          </div>
          <span className="material-symbols-outlined group-hover:text-white/80">
            <ChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default PowerControl;
