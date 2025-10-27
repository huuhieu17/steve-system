import React from "react";

interface Props {
  logs: string[];
}

const LogConsole: React.FC<Props> = ({ logs }) => (
  <div className="mt-4 bg-black text-green-400 font-mono p-3 rounded w-[800px] h-[300px] overflow-y-auto">
    {logs.map((l, i) => (
      <div key={i} className="text-white">{l}</div>
    ))}
  </div>
);

export default LogConsole;
