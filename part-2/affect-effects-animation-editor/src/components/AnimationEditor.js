import React, { useState, useEffect, useRef } from 'react';
import Lottie from "react-lottie";

export default function AnimationEditor({ animationData }) {
  const [layerProperties, setLayerProperties] = useState({});
  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(true); // State to manage playing/pausing the animation
  const [pickedColor, setPickedColor] = useState('#000000'); // State to store picked color
  const [showImportComponent, setShowImportComponent] = useState(true); // State to manage import component visibility
  const lottieRef = useRef(null);

  useEffect(() => {
    if (animationData) {
      const initialLayerProperties = {};
      animationData.layers.forEach(layer => {
        initialLayerProperties[layer.nm] = {
          x: layer.x || 0,
          y: layer.y || 0,
          o: layer.o || 100,
          c: 'black'
        };
      });
      setLayerProperties(initialLayerProperties);
      setShowImportComponent(false); // Hide import component when animation data is available
    }
  }, [animationData]);

  const handlePropertyChange = (layerName, property, value) => {
    setLayerProperties(prevState => ({
      ...prevState,
      [layerName]: {
        ...prevState[layerName],
        [property]: value
      }
    }));
  };

  const playAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
      setPlaying(true);
    }
  };

  const pauseAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.pause();
      setPlaying(false);
    }
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    if (lottieRef.current) {
      lottieRef.current.setSpeed(newSpeed);
    }
  };

  const handleColorChange = (e) => {
    setPickedColor(e.target.value);
  };


  return (
    <div>
      {showImportComponent ? (
        <div class="flex items-center justify-center w-1/2">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Json</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" />
          </label>
        </div>
      ) : (
        <div>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            height={400}
            width={400}
            lottieRef={lottieRef}
          />
          <div>
            <button onClick={playing ? pauseAnimation : playAnimation}>{playing ? 'Pause' : 'Play'}</button>
            <label>Speed:</label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={speed}
              onChange={handleSpeedChange}
            />
            <span>{speed}</span>
            <label>Color:</label>
            <input
              type="color"
              value={pickedColor}
              onChange={handleColorChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
