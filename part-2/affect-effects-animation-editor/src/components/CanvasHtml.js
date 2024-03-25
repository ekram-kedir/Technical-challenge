import React, { useState } from 'react';
import AnimationEditor from './AnimationEditor';
import CanvasAnimationViewer from './CanvasAnimationViewer';

export default function CommonAncestor() {
  const [animationData, setAnimationData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const animationData = JSON.parse(e.target.result);
          setAnimationData(animationData);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".json" />
      <AnimationEditor animationData={animationData} />
      <CanvasAnimationViewer animationData={animationData} />
    </div>
  );
}
