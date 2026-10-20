"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    FiPlus,
    FiSkipBack,
    FiSkipForward,
    FiPlay,
    FiPause,
} from "react-icons/fi";
import { HiOutlineGlobeAlt } from "react-icons/hi";

const footerLinks = [
    "Legal",
    "Safety & Privacy Center",
    "Privacy Policy",
    "Cookies",
    "About Ads",
    "Accessibility",
    "Cookies",
];

import { usePlayer } from "@/contexts/PlayerContext";

const Sidebar = () => {
    const { librarySongs, currentSong, isPlaying, playSong } = usePlayer();

    const isSongs = false;

    return (
        <div className="w-[30%] h-full bg-[#121212] text-white flex flex-col">
            <div className="flex flex-col flex-1 min-h-0">

                <div className="flex items-center justify-between px-4 py-4 shrink-0">
                    <h2 className="text-[#b8b8b8] font-bold text-base">
                        Your Library
                    </h2>

                    <button
                        aria-label="Create"
                        className="text-[#b8b8b8] hover:text-white hover:bg-[#1f1f1f] p-2 rounded-full transition-colors"
                    >
                        <FiPlus className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 min-h-0 flex flex-col gap-y-6">

                    {librarySongs.map((song) => {
                        const songIsPlaying =
                            currentSong?.id === song.id && isPlaying;

                        return (
                            <div
                                key={song.id}
                                className="bg-[#181818] border-t border-[#282828] px-4 py-3 w-full shrink-0"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <div className="w-12 h-12 bg-[#282828] rounded-md flex items-center justify-center shrink-0">
                                            <span className="text-xl">🎵</span>
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="text-white text-sm font-medium truncate">
                                                {song.title}
                                            </h3>

                                            <p className="text-[#b3b3b3] text-xs truncate mt-1">
                                                {song.artist}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end ml-4">
                                        <button
                                            aria-label={songIsPlaying ? "Pause" : "Play"}
                                            onClick={() => playSong(song)}
                                            className="bg-white text-black w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                                        >
                                            {songIsPlaying ? (
                                                <FiPause className="w-4 h-4 fill-current" />
                                            ) : (
                                                <FiPlay className="w-4 h-4 fill-current ml-0.5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

            <div className="px-6 py-10 text-xs text-[#b8b8b8] shrink-0">

                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
                    {footerLinks.map((link, i) => (
                        <a
                            key={`${link}-${i}`}
                            className="hover:underline hover:text-white cursor-pointer"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <button className="flex items-center gap-2 border border-[#494949] rounded-full px-3 py-1.5 text-white text-sm font-semibold hover:border-white transition-colors">
                    <HiOutlineGlobeAlt className="w-4 h-4" />
                    English
                </button>

            </div>

        </div>
    );
};

export default Sidebar;