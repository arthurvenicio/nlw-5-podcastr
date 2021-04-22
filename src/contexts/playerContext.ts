import { createContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  url: string;
  duration: number;

}

type PlayerContextData = {
 episodeList : Episode[];
 currentEpisodeIndex: number;
 isPlaying: boolean;
 play: (episode: Episode) => void;
 togglePlay: () => void;
 setPlayingState: (state: boolean) => void;
}

export const PlayerContext = createContext({} as PlayerContextData);