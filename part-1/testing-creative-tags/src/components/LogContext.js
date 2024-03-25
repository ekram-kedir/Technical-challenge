import React, { createContext, useState } from 'react';

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [capturedLogs, setCapturedLogs] = useState([]);

  const addLog = (log) => {
    setCapturedLogs(prevLogs => [...prevLogs, log]);
  };

  return (
    <LogContext.Provider value={{ capturedLogs, addLog }}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
