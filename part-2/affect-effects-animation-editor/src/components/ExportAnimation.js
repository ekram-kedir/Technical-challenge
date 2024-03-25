import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
// import Input from '@mui/material/Input';
// import Slider from '@mui/material/Slider';
// import Box from '@mui/material/Box';

function UploadAnimation() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [opacity, setOpacity] = useState(1); 
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const frameIndex = useRef(0);
  const animationFrames = useRef([]);

  useEffect(() => {
    if (isUploading) {
      const progressInterval = setInterval(() => {
        setUploadProgress(prevProgress => prevProgress + 10);
      }, 500);

      setTimeout(() => {
        setIsUploading(false);
        setSelectedFile(null);
        setUploadProgress(0);
      }, 3000);

      return () => clearInterval(progressInterval);
    }
  }, [isUploading]);

  useEffect(() => {
    if (isPlaying) {
      startPlayback();
    } else {
      stopPlayback();
    }

    return () => stopPlayback();
  }, [isPlaying]);

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadProgress(0);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        animationFrames.current.push({ src: reader.result, opacity }); 
      };
    }
  };

  const uploadImage = () => {
    if (!selectedFile) {
      return alert('Please select a PNG image to upload.');
    }

    setIsUploading(true);
  };

  const startPlayback = () => {
    if (!canvasRef.current) return;
    setIsPlaying(true);
    renderFrame();
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    cancelAnimationFrame(animationFrameId.current);
    clearTimeout(animationFrameId.current);
  };

  const renderFrame = () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    const { src, opacity: frameOpacity } = animationFrames.current[frameIndex.current];
    const image = new Image();
    image.src = src;
    image.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.globalAlpha = frameOpacity; 
      ctx.drawImage(image, 0, 0);
      frameIndex.current = (frameIndex.current + 1) % animationFrames.current.length;
      animationFrameId.current = setTimeout(renderFrame, 1000 / animationSpeed);
    };
  };

  const adjustSpeed = (event, value) => {
    setAnimationSpeed(value);
    if (isPlaying) {
      stopPlayback();
      startPlayback();
    }
  };

  const adjustOpacity = (event, value) => {
    setOpacity(value);
  };

  const exportAnimation = () => {
    const animationCode = generateAnimationCode();
    const blob = new Blob([animationCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'animatedCanvas.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateAnimationCode = () => {
    let code = '';

    animationFrames.current.forEach((frame, index) => {
      const { src, opacity } = frame;
      code += `const image${index} = new Image();\n`;
      code += `image${index}.src = '${src}';\n`;
      code += `image${index}.onload = () => {\n`;
      code += `  ctx.clearRect(0, 0, canvas.width, canvas.height);\n`;
      code += `  ctx.globalAlpha = ${opacity};\n`;
      code += `  ctx.drawImage(image${index}, 0, 0);\n`;
      code += `};\n\n`;
    });

    return code;
  };

  return (
    <div>
      {/* <Input type="file" onChange={handleFileChange} accept=".png" disabled={isUploading} />
      <Button variant="contained" onClick={uploadImage} disabled={isUploading}>
        {isUploading ? `Uploading...${uploadProgress}%` : 'Upload Animation'}
      </Button>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      <Box sx={{ width: 300 }}>
        <canvas ref={canvasRef} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Slider
          value={animationSpeed}
          min={0.1}
          max={2}
          step={0.1}
          onChange={adjustSpeed}
          disabled={isUploading}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <p>Opacity:</p>
        <Slider
          value={opacity}
          min={0}
          max={1}
          step={0.1}
          onChange={adjustOpacity}
          disabled={isUploading}
        />
      </Box> */}
      <Button variant="contained" onClick={exportAnimation} disabled={isUploading}>
        Export Animation
      </Button>
    </div>
  );
}

export default UploadAnimation;
