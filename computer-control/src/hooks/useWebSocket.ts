import { useState, useRef } from "react";

export interface Message {
  type: string;
  from?: string;
  message?: string;
  data?: any;
}

export function useWebSocket() {
  const [isConnected, setConnected] = useState(false);
  let deviceIdRef = useRef<string>("");
  let clientIdRef = useRef<string>("");
  const [logs, setLogs] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = (deviceId: string, clientId: string) => {
    deviceIdRef.current = deviceId;
    clientIdRef.current = clientId;
    const ws = new WebSocket(`ws://control.imsteve.dev/ws/${clientId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ client_id: clientId, type: "ping" }));
      ws.send(JSON.stringify({ client_id: clientId, type: "connect_agent", to: deviceId }));
    };

    ws.onclose = () => {
      setConnected(false);
      console.log("Socket close");

      appendLog("❌ Disconnected");
    };

    ws.onmessage = (event) => {
      try {
        const msg: Message = JSON.parse(event.data);
        if (msg.type === "connect_success") {
          setConnected(true);
          appendLog(`✅ Connected to device ${deviceId}`);
          return;
        }
        appendLog(`📩 ${JSON.stringify(msg)}`);
      } catch {
        appendLog(`📩 Raw: ${event.data}`);
      }
    };
  };

  const sendCommand = (cmd_type: string, payload: any = {}) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      appendLog("⚠️ Not connected");
      return;
    }

    const message = {
      client_id: clientIdRef.current,
      type: "command",
      to: deviceIdRef.current,
      payload: { cmd_type, ...payload },
    };

    wsRef.current.send(JSON.stringify(message));
    appendLog(`➡️ Sent command: ${cmd_type} ${JSON.stringify(payload)}`);
  };


  const sendChat = (message: string) => {
    if (!wsRef.current) return;
    const msg = {
      client_id: clientIdRef.current,
      type: "chat",
      to: deviceIdRef.current,
      payload: {
        message,
      },
    };
    wsRef.current.send(JSON.stringify(msg));
    appendLog(`💬 Sent chat: ${message}`);
  };

  const closeConnection = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      appendLog("🔌 Attempting to disconnect...");
      wsRef.current.close(1000, "User initiated disconnect"); // 1000 = Normal Closure
    } else {
      appendLog("ℹ️ Already disconnected.");
    }
  };

  const appendLog = (msg: string) => setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  return { connect, sendCommand, sendChat, closeConnection, logs, isConnected, deviceId: deviceIdRef.current, clientId: clientIdRef.current };
}
