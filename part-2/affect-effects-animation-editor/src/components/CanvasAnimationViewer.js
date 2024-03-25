import React, { useState, useEffect, useRef } from 'react';
import Lottie from "lottie-web";

export default function CanvasAnimationViewer({ animationData }) {
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

  const handleShowCanvasClick = () => {
    setIsAnimating(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={handleShowCanvasClick}>
        {isAnimating ? 'Hide Animation' : 'Show HTML Canvas'}
      </button>
      <div style={{ marginTop: '20px' }}>
        
          <canvas ref={canvasRef} width={400} height={400}></canvas>
       
      </div>
    </div>
  );
}
