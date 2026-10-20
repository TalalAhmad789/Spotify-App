"use client";

import React, { useState } from "react";
import { usePlayer } from "@/contexts/PlayerContext";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRegHeart,
} from "react-icons/fa";
import { HiOutlineQueueList } from "react-icons/hi2";
import { MdOutlineDevices } from "react-icons/md";
import { BsVolumeUp } from "react-icons/bs";

const Seekbar = () => {

  const { currentSong, isPlaying, currentTime, duration, volume, setVolume, togglePlay, seekTo, nextSong, prevSong } = usePlayer();

  const formatTime = (time) => {
    if (!Number.isFinite(time) || time < 0) return "0:00"

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full h-20 bg-[#181818] text-white flex items-center py-10 justify-between px-4 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-[#282828]" />

      <div className="w-[30%] flex items-center gap-3 min-w-0">
        <div className="w-14 h-14 rounded-md shrink-0 bg-linear-to-br from-red-900 to-black shadow-md" />

        <div className="min-w-0">
          <h4 className="text-sm font-semibold truncate">
            {currentSong?.title || "No song selected"}
          </h4>

          <p className="text-xs text-[#b8b8b8] truncate">
            {currentSong?.artist || "Choose a song from your library"}
          </p>
        </div>
      </div>

      <div className="w-[40%] flex flex-col items-center gap-2">
        <div className="flex items-center gap-6">
          <button
            onClick={prevSong}
            aria-label="Previous song"
            className="text-[#b8b8b8] hover:text-white transition-colors"
          >
            <FaStepBackward className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <FaPause className="w-3.5 h-3.5" />
            ) : (
              <FaPlay className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>

          <button
            onClick={nextSong}
            aria-label="Next song"
            className="text-[#b8b8b8] hover:text-white transition-colors"
          >
            <FaStepForward className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full flex items-center gap-2">
          <span className="text-[11px] text-[#b8b8b8] w-9 text-right shrink-0">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={duration > 0 ? currentTime : 0}
            disabled={!currentSong || duration <= 0}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="seek-range w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #1ed760 ${progress}%, #4d4d4d ${progress}%)`,
            }}
          />

          <span className="text-[11px] text-[#b8b8b8] w-9 shrink-0">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="w-[30%] flex items-center justify-end gap-4">
        <div className="flex items-center gap-2 w-28">
          <BsVolumeUp className="w-4 h-4 text-[#b8b8b8] shrink-0" />
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="seek-range w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #1ed760 ${volume}%, #4d4d4d ${volume}%)`,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .seek-range::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background: white;
          opacity: 0;
          transition: opacity 0.15s ease;
        }
        .seek-range:hover::-webkit-slider-thumb {
          opacity: 1;
        }
        .seek-range::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border: none;
          border-radius: 9999px;
          background: white;
          opacity: 0;
          transition: opacity 0.15s ease;
        }
        .seek-range:hover::-moz-range-thumb {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Seekbar;