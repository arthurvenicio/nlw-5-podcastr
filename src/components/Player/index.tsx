import { useRef, useEffect, useState } from 'react';
import {usePlayer} from '../../contexts/PlayerContext'
import styles from './style.module.scss';
import Image from 'next/image';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { useMode } from '../../contexts/DarkMode';

export function Player(){
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList, 
    currentEpisodeIndex, 
    isPlaying,
    isLooping,
    isShuffling, 
    togglePlay,
    toggleLoop,
    toggleShuffle, 
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayerState
  } = usePlayer()

  const { isDark } = useMode();

  useEffect(() => {
    if(!audioRef.current){
      return;
    }
    if(isPlaying)  {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate' , () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleEpisodeEnded() {
    if (hasNext){
      playNext()
    } else{ 
      clearPlayerState ()
    }
  }

  function handleSeek (amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={isDark ? styles.container : styles.darkContainer}>
      <header>
        <img src="playing.svg" alt="Tocando Agora"/>
        <strong>Tocando Agora</strong>
      </header>

      { episode ? (
        <div className={styles.currentEpisode}>
          <Image width={ 592}
           height={592} 
           src={episode.thumbnail} 
           objectFit="cover" />

          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ):(
      <div className={isDark ? styles.emptyPlayer : styles.darkEmptyPlayer}>
      <strong>Selecione um podcast para ouvir</strong>
    </div>)}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
        <span>{convertDurationToTimeString(progress)}</span>

          <div className={styles.slider}>
            { episode ? (
              <Slider
              max={episode.duration}
              value={progress}
              onChange={handleSeek}
              trackStyle={{ backgroundColor: '#04d361'}}
              railStyle={{backgroundColor:'#9f75ff'}} 
              handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
              />
            ) : (
              <div className={styles.emptySlider}/>
            ) } 
          </div>   

          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>
        {episode && (
          <audio ref={audioRef} 
          src={episode.url} 
          autoPlay
          loop={isLooping}
          onPlay={() => setPlayingState(true)} 
          onPause={() => setPlayingState(false)}
          onEnded={handleEpisodeEnded}
          onLoadedMetadata={setupProgressListener}
          />
        )}


        <div className={styles.buttons}>
          <button type="button" 
          onClick={toggleShuffle}
          className={isShuffling ? styles.isActive : ''}
          disabled={!episode || episodeList.length == 1}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button"
          className={styles.playButton} 
          disabled={!episode}
          onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Pausar" />
            ) : (
            <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
            <img src="/play-next.svg" alt="Tocar proxima" />
          </button>
          <button type="button" 
          className={isLooping ? styles.isActive : ''} 
          onClick={toggleLoop} 
          disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}