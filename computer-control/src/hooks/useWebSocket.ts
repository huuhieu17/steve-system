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
    const ws = new WebSocket(`wss://control.imsteve.dev/ws/${clientId}`);
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

        if (msg.type === "forward_list_running_process") {
          window.dispatchEvent(new CustomEvent("processListUpdate", { detail: msg.data?.data ?? [] }));
          appendLog(`📋 Received process list (${msg.data.length} items)`);
          return;
        }
        appendLog(`${JSON.stringify(msg)}`);
      } catch {
        appendLog(`${event.data}`);
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
      message
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

  const appendLog = (msg: string) => {
    try {
      const parsed = JSON.parse(msg);

      // 🗨️ Chat message
      if (parsed.type === "chat") {
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] 💬 ${parsed.from}: ${parsed.message}`,
        ]);
        return;
      }

      if (parsed.type === "pong") {
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] <span style="color: green">🏓 Ping received from ${parsed.from || "unknown"}</span>`,
        ]);
        return;
      }
      if (parsed.type === "error") {
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] <span style="color: red">❌ Error: ${parsed.message}</span>`,
        ]);
        return;
      }

      // 🖼️ Screenshot (base64)
      if (parsed.type === "show_screenshot" && parsed.file) {
        const imageHtml = `<img src="data:image/png;base64,${parsed.file}" 
                             alt="screenshot" 
                             style="max-width:200px;border-radius:6px;border:1px solid #ddd;margin-top:4px"/>`;

        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] 🖼️ Screenshot received from ${parsed.from || "unknown"}: ${imageHtml}`,
        ]);
        return;
      }

      // Loại khác (hoặc không có type)
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ${msg}`,
      ]);
    } catch (e) {
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ${msg}`,
      ]);
    }
  };


  return { connect, sendCommand, sendChat, closeConnection, logs, isConnected, deviceId: deviceIdRef.current, clientId: clientIdRef.current };
}
