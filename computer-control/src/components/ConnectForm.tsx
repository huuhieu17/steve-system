import React, { useState } from "react";

interface Props {
  onConnect: (deviceId: string, clientId: string) => void;
  isConnected: boolean;
  closeConnection: () => void;
}

const ConnectForm: React.FC<Props> = ({ onConnect, isConnected, closeConnection }) => {
  const [deviceId, setDeviceId] = useState("");
  const [clientId,] = useState(() => "controller-" + crypto.randomUUID().slice(0, 8));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(deviceId, clientId);
  };

  if(isConnected) {
    return <div className="mb-5">
      <h2 className="text-lg font-semibold mb-3">✅ Connected to {deviceId}</h2>
      <button className="px-4 mr-2 py-2 bg-gray-500 text-white rounded" onClick={() => onConnect(deviceId, clientId)}>Reconnect</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => closeConnection()}>Disconnect</button>
    </div>
  }
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-3">🔗 Connect to Agent</h2>
      <div className="mb-2">
        <label className="block mb-1">Device ID</label>
        <input
          className="border px-2 py-1 w-full rounded"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          placeholder="agent-1234"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Your Client ID</label>
        <input className="border px-2 py-1 w-full rounded" value={clientId} readOnly />
      </div>
      <button
        type="submit"
        className={`w-full py-2 rounded text-white ${isConnected ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        Connect
      </button>
    </form>
  );
};

export default ConnectForm;
