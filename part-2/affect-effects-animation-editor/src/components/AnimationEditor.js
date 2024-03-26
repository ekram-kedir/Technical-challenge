import React, { useState, useEffect, useRef } from 'react';
import Lottie from "react-lottie";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { IoArrowUndoCircleSharp } from "react-icons/io5";
import { IoArrowRedoCircle } from "react-icons/io5";
import ColorEditor from './ColorEditor';

export default function AnimationEditor({ animationData }) {
  const [playing, setPlaying] = useState(true); 
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
    }
  }, [animationData]);


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


  return (
    <div>
      <div className='flex flex-col'>
        <div className='ml-[-70px] md:ml-[-90px] w-full h-[400px]'>
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
        </div>
        <div className='flex flex-row gap-48 ml-8 mt-16'>
          <FaPlayCircle size={40} onChange={playAnimation} />
          <FaPauseCircle size={40} onChange={pauseAnimation}/>
          <IoArrowUndoCircleSharp size={40}/>
          <IoArrowRedoCircle size={40} />
        </div>
      </div>
    </div>
  );
}
