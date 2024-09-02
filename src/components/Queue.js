import React, { useEffect, useState } from 'react';
import musics from '../assets/data';
import { timer } from '../utils/timeConverter';

const Queue = ({ props: { open, setOpen, musicNumber, setMusicNumber } }) => {
  return (
    <div className={`queue ${open ? 'show' : ''}`}>
      <div className='header'>
        <div>
          <i className='material-icons' id='queue_icon'>queue_music</i>
          <span>Music Queue</span>
        </div>
        <i className='material-icons' onClick={() => setOpen(false)}>close</i>
      </div>
      <ul>
        {
          musics.map((music, index) => (
            <li key={music.id} onClick={() => setMusicNumber(index)}
              className={`${(musicNumber === index ? 'playing' : '')}`}>
              <div className='row'>
                <span>{music.title}</span>
                <p>{music.artist}</p>
              </div>
              <Duration music={music} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Queue

const Duration = ({ music }) => {
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const audio = new Audio(music.src)
    audio.onloadedmetadata = function () {
      if (audio.readyState > 0) {
        setDuration(audio.duration)
      }
    }
  }, [music])
  return (
    <span className='duration'>{timer(duration)}</span>
  )
}