import React from "react";

interface Props {
  logs: string[];
}

const LogConsole: React.FC<Props> = ({ logs }) => (
  <div
    className="mt-4 bg-black text-green-400 font-mono p-3 rounded overflow-y-auto"
    style={{
      height: "300px",
      width: "100%",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
    }}
  >
    {logs.map((l, i) => (
      <div
        key={i}
        className="text-white mb-1"
        dangerouslySetInnerHTML={{ __html: l }}
      />
    ))}
  </div>
);

export default LogConsole;
