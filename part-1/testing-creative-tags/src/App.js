import React from 'react';
import AdUnit from '../../../part-1/testing-creative-tags/src/components/AdUnit';
import ConsoleReader from './components/useConsoleLogCapture'; // Import the ConsoleReader component
import SelectEvents from './components/SelectEvents';
import creative_initiated_events from './data/events.json';

function App() {
  ConsoleReader();

  return (
    <div className=''>
      <AdUnit />
      <ConsoleReader />
      <SelectEvents jsonData={creative_initiated_events} />
    </div>
  );
}

export default App;
