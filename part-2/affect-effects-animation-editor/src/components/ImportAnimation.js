import React, { useState, useEffect, useRef } from 'react';
import Lottie from "lottie-web";

export default function ImportAnimation() {
  const [animationData, setAnimationData] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isAnimating && canvasRef.current && animationData) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const animation = Lottie.loadAnimation({
        container: canvas,
        renderer: 'canvas',
        animationData: animationData,
        loop: true,
        autoplay: true,
        rendererSettings: {
          context: ctx,
          clearCanvas: true,
          progressiveLoad: false,
          preserveAspectRatio: 'xMidYMid slice'
        }
      });
      return () => animation.destroy(); 
    }
  }, [isAnimating, animationData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const animationData = JSON.parse(e.target.result);
          setAnimationData(animationData);
          setIsAnimating(true); 
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex items-center justify-center w-1/2">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">JSON</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".json" />
      </label>
      {isAnimating && animationData && (
        <div style={{ marginLeft: '20px' }}>
          <canvas ref={canvasRef} width={400} height={400}></canvas>
        </div>
      )}
    </div>
  );
}
