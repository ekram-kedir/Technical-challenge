import React, { useContext } from 'react';
import LogContext from './LogContext';

const Read = () => {
  const { capturedLogs } = useContext(LogContext);

  return (
    <div>
      <ul>
        startttt
        {capturedLogs.map((log, index) => (
          <li key={index}>{JSON.stringify(log)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Read;
