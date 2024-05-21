import React, {useRef, useState} from "react";
import {Howl, Howler} from "howler";
import {Direction, playlist} from "./constants";

export const AudioPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const player = useRef<Howl | null>(null);

  const loadTrack = (index: number) => {
    const track = playlist[index];
    if (track.howl) {
      player.current = track.howl;
    } else {
      player.current = new Howl({
        src: [track.file],
        html5: true,
        onend: () => skip(Direction.NEXT),
      });
      track.howl = player.current;
    }
  };

  const play = (index?: number) => {
    if (index !== undefined) {
      if (player.current) {
        player.current.stop();
      }
      loadTrack(index);
      setCurrentTrackIndex(index);
    }

    player.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    player.current?.pause();
    setIsPlaying(false);
  };

  const skipTo = (index: number) => {
    if (player.current) {
      player.current.stop();
    }
    play(index);
  };

  const skip = (direction: Direction) => {
    let newIndex =
      direction === "next" ? currentTrackIndex + 1 : currentTrackIndex - 1;
    if (newIndex >= playlist.length) newIndex = 0;
    if (newIndex < 0) newIndex = playlist.length - 1;
    skipTo(newIndex);
  };

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    Howler.volume(val);
  };

  const togglePlayOrPause = () => (isPlaying ? pause() : play());

  return (
    <div className="audio-player">
      <div id="track">{`${currentTrackIndex + 1}. ${
        playlist[currentTrackIndex].title
      }`}</div>
      <button id="playBtn" onClick={togglePlayOrPause}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button id="prevBtn" onClick={() => skip(Direction.PREV)}>
        Previous
      </button>
      <button id="nextBtn" onClick={() => skip(Direction.NEXT)}>
        Next
      </button>
      <div id="volume">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};
