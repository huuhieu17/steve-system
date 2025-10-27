export const commandList = [
  { id: "1", label: "Shutdown", cmd_type: "shutdown", payload: {} },
  { id: "2", label: "Restart", cmd_type: "restart", payload: {} },
  { id: "3", label: "Kill App (notepad.exe)", cmd_type: "kill_app", payload: { app_name: "notepad.exe" } },
  { id: "4", label: "Screenshot", cmd_type: "screenshot", payload: {} },
  { id: "5", label: "Shell: whoami", cmd_type: "shell", payload: { command: "whoami" } },
  { id: "6", label: "Shell: ipconfig", cmd_type: "shell", payload: { command: "ipconfig" } },
];
