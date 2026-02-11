import { useWebSocket } from "@/hooks/useWebSocket";
import { Bluetooth, BluetoothOff, Camera, ChevronRight, Wifi, WifiOff } from "lucide-react";
import React from "react";

interface UltilityControlProps {
  onSend: (cmd_type: string, payload: Record<string, any>) => void;
}

const UltilityControl: React.FC<UltilityControlProps> = ({ onSend }) => {
  const { clientId } = useWebSocket();

  const sendCommand = (payload: Record<string, any> = {}) => {
    onSend("command", payload);
  };


  return (
    <div className="bg-white dark:bg-[#1c2027] rounded-xl p-2 shadow-xl border border-gray-200 dark:border-[#282f39]">
      <div className="grid grid-cols-1 gap-3">
        <button onClick={() =>
          sendCommand({ cmd_type: "screenshot", reply_to: clientId })
        } className="group flex items-center text-green-500 justify-between w-full p-2 rounded-lg hover:bg-green-500 hover:text-white transition-all border border-green-500 hover:border-green-600">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-green-500 group-hover:text-white">
              <Camera />
            </span>
            <span className="font-semibold ">Chụp màn hình</span>
          </div>
          <span className="material-symbols-outlined text-green-500 group-hover:text-white/80">
            <ChevronRight />
          </span>
        </button>
        <button
          onClick={() => sendCommand({ cmd_type: "enable_wifi" })}
          className="group flex items-center text-blue-500 justify-between w-full p-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all border border-blue-500 hover:border-blue-600">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-500 group-hover:text-white">
              <Wifi />
            </span>
            <span className="font-semibold ">Kích hoạt Wi-Fi</span>
          </div>
          <span className="material-symbols-outlined text-blue-500 group-hover:text-white/80">
            <ChevronRight />
          </span>
        </button>
        <button
          onClick={() => sendCommand({ cmd_type: "disable_wifi" })}
          className="group flex items-center text-gray-500 justify-between w-full p-2 rounded-lg hover:bg-gray-500 hover:text-white transition-all border border-gray-500 hover:border-gray-600">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gray-500 group-hover:text-white">
              <WifiOff />
            </span>
            <span className="font-semibold ">Tắt Wi-Fi</span>
          </div>
          <span className="material-symbols-outlined text-gray-500 group-hover:text-white/80">
            <ChevronRight />
          </span>
        </button>
        <button
          onClick={() => sendCommand({ cmd_type: "enable_bluetooth" })}
          className="group flex items-center text-blue-500 justify-between w-full p-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all border border-blue-500 hover:border-blue-600">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-500 group-hover:text-white">
              <Bluetooth />
            </span>
            <span className="font-semibold ">Kích hoạt Bluetooth</span>
          </div>
          <span className="material-symbols-outlined text-blue-500 group-hover:text-white/80">
            <ChevronRight />
          </span>
        </button>
        <button
          onClick={() => sendCommand({ cmd_type: "disable_bluetooth" })}
          className="group flex items-center text-gray-500 justify-between w-full p-2 rounded-lg hover:bg-gray-500 hover:text-white transition-all border border-gray-500 hover:border-gray-600">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gray-500 group-hover:text-white">
              <BluetoothOff />
            </span>
            <span className="font-semibold ">Tắt Bluetooth</span>
          </div>
          <span className="material-symbols-outlined text-gray-500 group-hover:text-white/80">
            <ChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default UltilityControl;
