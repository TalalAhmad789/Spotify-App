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
    const { currentSong, setCurrentSong, nextSong, setNextSong, prevSong, setPrevSong } = usePlayer();
    const audioRef = useRef(null);
    const [librarySongs, setLibrarySongs] = useState([
        {
            id: 1,
            title: "Elektronomia - Sky High Progressive House NCS",
            artist: "Talal Ahmad",
            audio: "/songs/Elektronomia - Sky High Progressive House NCS - Copyright Free Music.mp3",
            isPlaying: false
        },
        {
            id: 2,
            title: "Lost Sky - Fearless pt.II (feat. Chris Linton) Trap NCS",
            artist: "Absar Ahmad",
            audio: "/songs/Lost Sky - Fearless pt.II (feat. Chris Linton) Trap NCS - Copyright Free Music.mp3",
            isPlaying: false
        },
        {
            id: 3,
            title: "Warriyo - Mortals (feat. Laura Brehm) Future Trap NCS",
            artist: "Zikria Ahmad",
            audio: "/songs/Warriyo - Mortals (feat. Laura Brehm) Future Trap NCS - Copyright Free Music.mp3",
            isPlaying: false
        },
    ])

    const handlePlayingSong = (songId) => {
        const targetSong = librarySongs.find((song) => song.id === songId);
        if (!targetSong) return;

        if (targetSong.isPlaying) {
            if (audioRef.current) {
                audioRef.current.pause();
            }

            setLibrarySongs((prev) =>
                prev.map((s) => (s.id === songId ? { ...s, isPlaying: false } : s))
            );
            setCurrentPlayingId(null);
            return;
        }

        if (audioRef.current) {
            audioRef.current.pause();
        }

        const newAudio = new Audio(targetSong.audio);
        audioRef.current = newAudio;

        newAudio.play().catch((err) => {
            console.error("Audio playback error:", err);
        });

        newAudio.onended = () => {
            setLibrarySongs((prev) =>
                prev.map((s) => ({ ...s, isPlaying: false }))
            );
            setCurrentPlayingId(null);
        };

        setCurrentPlayingId(songId);
        setLibrarySongs((prevSongs) =>
            prevSongs.map((song) => ({
                ...song,
                isPlaying: song.id === songId,
            }))
        );
    };

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])


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

                    {librarySongs.length > 0 ? librarySongs.map((song, index) => {
                        return (
                            <div key={index} className="bg-[#181818] border-t border-[#282828] px-4 py-3 w-full shrink-0">

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-3 min-w-0 flex-1">

                                        <div className="w-12 h-12 bg-[#282828] rounded-md flex items-center justify-center shrink-0">
                                            <span className="text-xl">
                                                🎵
                                            </span>
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
                                            aria-label={song.isPlaying ? "Pause" : "Play"}
                                            onClick={() => handlePlayingSong(song.id)}
                                            className="bg-white text-black w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                                        >
                                            {song.isPlaying ? (
                                                <FiPause className="w-4 h-4 fill-current" />
                                            ) : (
                                                <FiPlay className="w-4 h-4 fill-current ml-0.5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) :
                        <>
                            <div className="bg-[#1f1f1f] rounded-lg p-4 mx-3">
                                <h3 className="font-bold text-sm mb-1">
                                    Create your first playlist
                                </h3>

                                <p className="text-[#b8b8b8] text-sm mb-4">
                                    It&apos;s easy, we&apos;ll help you
                                </p>

                                <button className="bg-white text-black text-sm font-bold rounded-full px-4 py-2 hover:scale-105 transition-transform">
                                    Create playlist
                                </button>
                            </div>

                            <div className="bg-[#1f1f1f] rounded-lg p-4 mx-3">
                                <h3 className="font-bold text-sm mb-1">
                                    Let&apos;s find some podcasts to follow
                                </h3>

                                <p className="text-[#b8b8b8] text-sm mb-4">
                                    We&apos;ll keep you updated on new episodes
                                </p>

                                <button className="bg-white text-black text-sm font-bold rounded-full px-4 py-2 hover:scale-105 transition-transform">
                                    Browse podcasts
                                </button>
                            </div>
                        </>
                    }



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