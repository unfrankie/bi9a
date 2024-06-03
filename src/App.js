import React, { useState, useRef, useEffect } from 'react';
import bgImage from './assets/video_background/background.webm';
import Player from './components/Player';
import Queue from './components/queue';
import './assets/css/player.css';

const App = () => {
  const [musicNumber, setMusicNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className='container'>
      <div className='overlay'></div>
      <video autoPlay loop muted ref={videoRef}>
        <source src={bgImage} type='video/webm'/>
      </video>
      <main>
        <Player props={{ musicNumber, setMusicNumber, setOpen, setIsPlaying }} />
        <Queue props={{ open, setOpen, musicNumber, setMusicNumber }} />
      </main>
    </div>
  );
};

export default App;