import React, { useEffect, useState } from "react";

interface Props {
  onSendCommand: (cmd: string, payload?: any) => void;
}

interface ProcessInfo {
  pid: number;
  name: string;
  cpu?: number;
  memory?: number;
}

const ProcessListPanel: React.FC<Props> = ({ onSendCommand }) => {
  const [processes, setProcesses] = useState<ProcessInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProcesses = async () => {
    setLoading(true);
    onSendCommand("get_list_process");
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    const handler = (e: any) => {
      setProcesses(e.detail || []); 
      setLoading(false);
    };
    window.addEventListener("processListUpdate", handler);
    return () => window.removeEventListener("processListUpdate", handler);
  }, []);

  const killProcess = (pid: number) => {
    if (confirm(`Bạn có chắc muốn kill process ${pid}?`)) {
      onSendCommand("kill_process", { pid });
      fetchProcesses();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Process List</h2>
        <button
          onClick={fetchProcesses}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {processes.length === 0 ? (
        <p className="text-gray-500 text-sm">No processes loaded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-3 py-2 text-left">PID</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">CPU %</th>
                <th className="px-3 py-2 text-left">Memory MB</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((p) => (
                <tr key={p.pid} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2">{p.pid}</td>
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">{p.cpu ?? "-"}</td>
                  <td className="px-3 py-2">{p.memory ?? "-"}</td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => killProcess(p.pid)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Kill
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProcessListPanel;
