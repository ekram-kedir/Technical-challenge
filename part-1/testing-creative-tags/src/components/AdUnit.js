import React, { useState } from 'react';
import ScriptEmbedder from './ScriptEmbedder';
import Editor from '@monaco-editor/react';

const AdUnit = () => {
  const [userCode, setUserCode] = useState('');
  const [userData, setUserData] = useState({});

  const handleEditorChange = (value) => {
    setUserCode(value);
  };

  const handleSubmit = () => {
    try {
      const parsedData = JSON.parse(userCode);
      console.log(userData);
      setUserData(parsedData);
    } catch (error) {
      console.error('Error parsing user code:', error);
    }
  };

  return (
    <>
    <div className='text-3xl text-purple-800 font-weight-[400] mt-[36px] ml-[20px]'>TESTING CREATIVE TAGS</div>
    <div className='flex flex-row md:flex-col mt-2 ml-[20px]'> 
      <div className='flex flex-row gap-2 mt-[60px]'>
      <Editor  
        width="550px" 
        height="560px" 
        theme='vs-dark'
        defaultLanguage="json"
        value={userCode}
        onChange={handleEditorChange}
      />

     
      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 mt-[280px] mb-[280px] md:ml-[100px]" onClick={handleSubmit}>
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
       Render
      </span>
      </button>
      
      <div className='flex justify-center ml-[150px] mt-10'>
      <ScriptEmbedder
        scriptId="gameLoaderScript"
        src="https://wat.adludio.com/loaders/cda/dsp_tester.js"
        data={userData}
      />
    </div>
    </div>
    </div>
    </>
  );
};

export default AdUnit;


