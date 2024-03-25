import { useContext, useEffect } from 'react';
import LogContext from './LogContext';

const useConsoleLogCapture = () => {
  const { addLog } = useContext(LogContext);

  useEffect(() => {
    const originalLog = console.log;
    console.log = function () {
      const logArguments = Array.from(arguments);
      if (logArguments.some(arg => typeof arg === 'string' && arg.includes("EVENT DATA:"))) {
        const eventDataIndex = logArguments.findIndex(arg => typeof arg === 'object' && arg !== null && arg.event_type);
        if (eventDataIndex !== -1) {
          addLog(logArguments[eventDataIndex].event_type);
        }
      }
      originalLog.apply(console, arguments);
    };

    return () => {
      console.log = originalLog;
    };
  }, [addLog]);
};

export default useConsoleLogCapture;
