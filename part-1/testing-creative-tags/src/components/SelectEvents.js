import React, { useState, useEffect, useContext } from 'react';
import LogContext from './LogContext';

const SelectEvents = ({ jsonData }) => {
  const { capturedLogs } = useContext(LogContext);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [commonEvents, setCommonEvents] = useState([]);
  
  useEffect(() => {
    const recordedEvents = capturedLogs.map(log => log.event_type);
    const commonEvents = selectedEvents.filter(event => recordedEvents.includes(event));
    setCommonEvents(commonEvents);
  }, [capturedLogs, selectedEvents]);

  const renderCheckboxes = () => {
    const checkboxes = [];
    let columnCheckboxes = [];
    let count = 0;

    for (const eventType in jsonData.events) {
      const status = jsonData.events[eventType];
      if (status === "reactive") {
        columnCheckboxes.push(
          <div key={eventType} className="flex items-center mb-4">
            <input
              id={eventType}
              type="checkbox"
              value={eventType}
              className="w-4 h-4 text-black rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor={eventType}
              className="ms-2 text-sm font-medium text-black"
            >
              {eventType}
            </label>
          </div>
        );
        count++;
        if (count === 6) {
          checkboxes.push(
            <div key={checkboxes.length} className="flex flex-col">
              {columnCheckboxes}
            </div>
          );
          columnCheckboxes = [];
          count = 0;
        }
      }
    }
    if (columnCheckboxes.length > 0) {
      checkboxes.push(
        <div key={checkboxes.length} className="flex flex-col">
          {columnCheckboxes}
        </div>
      );
    }

    return checkboxes;
  };

  // Handle checkbox change event
  const handleCheckboxChange = (event) => {
    const eventType = event.target.value;
    if (event.target.checked) {
      setSelectedEvents(prevSelected => [...prevSelected, eventType]);
    } else {
      setSelectedEvents(prevSelected => prevSelected.filter(event => event !== eventType));
    }
  };

  // Handle button click to display common events
  const handleButtonClick = () => {
    const recordedEvents = capturedLogs.map(log => log.event_type);
    const commonEvents = selectedEvents.filter(event => recordedEvents.includes(event));
    setCommonEvents(commonEvents); 
  };

  useEffect(() => {
    console.log("Common Events:", commonEvents);
  }, [commonEvents]);

  return (
    <div className='flex flex-col gap-8 ml-7 mb-5'>
      <div className='text-3xl text-purple-800 font-weight-[400]'>GUESS THE EVENTS EMITTED</div>
      <div className="flex gap-8">
        {renderCheckboxes()}
      </div>
      {selectedEvents.length > 0 && (

        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" onClick={handleButtonClick}>
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Show Common Events
        </span>
        </button>
 

      )}
      {commonEvents.length > 0 && (
        <div className="text-lg font-medium text-black mt-4">
          Common Events: {commonEvents.join(', ')}
        </div>
      )}
      {commonEvents.length > 0 && (
        <div className="text-lg font-medium text-black mt-4">
          <strong>Common Events:</strong>
          <ul>
            {commonEvents.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectEvents;
