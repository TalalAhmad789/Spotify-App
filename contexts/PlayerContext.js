"use client";

import {
    useContext,
    createContext,
    useState,
    useEffect,
    useRef,
    useCallback,
} from "react";

const PlayerContext = createContext(null);

const initialSongs = [
    {
        id: 1,
        title: "Elektronomia - Sky High Progressive House NCS",
        artist: "Talal Ahmad",
        audio:
            "/songs/Elektronomia - Sky High Progressive House NCS - Copyright Free Music.mp3",
    },
    {
        id: 2,
        title: "Lost Sky - Fearless pt.II (feat. Chris Linton) Trap NCS",
        artist: "Absar Ahmad",
        audio:
            "/songs/Lost Sky - Fearless pt.II (feat. Chris Linton) Trap NCS - Copyright Free Music.mp3",
    },
    {
        id: 3,
        title: "Warriyo - Mortals (feat. Laura Brehm) Future Trap NCS",
        artist: "Zikria Ahmad",
        audio:
            "/songs/Warriyo - Mortals (feat. Laura Brehm) Future Trap NCS - Copyright Free Music.mp3",
    },
];

export function PlayerProvider({ children }) {
    const audioRef = useRef(null);

    const [librarySongs] = useState(initialSongs);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);

    useEffect(() => {
        const audio = new Audio();

        audio.preload = "metadata";
        audio.volume = volume / 100;

        audioRef.current = audio;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        };

        const updateDuration = () => {
            setDuration(
                Number.isFinite(audio.duration) ? audio.duration : 0
            );
        };

        const handlePlay = () => {
            setIsPlaying(true);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("durationchange", updateDuration);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.pause();

            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("durationchange", updateDuration);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("ended", handleEnded);

            if (audioRef.current === audio) {
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    const playSong = useCallback(
        async (song) => {
            const audio = audioRef.current;

            if (!audio || !song) return;

            const songUrl = new URL(
                song.audio,
                window.location.href
            ).href;

            const sameSong =
                currentSong?.id === song.id &&
                audio.src === songUrl;

            if (sameSong) {
                if (audio.paused) {
                    try {
                        await audio.play();
                    } catch (error) {
                        console.error("Audio playback error:", error);
                    }
                } else {
                    audio.pause();
                }

                return;
            }

            setCurrentSong(song);
            setCurrentTime(0);
            setDuration(0);

            audio.src = song.audio;
            audio.currentTime = 0;

            try {
                await audio.play();
            } catch (error) {
                console.error("Audio playback error:", error);
            }
        },
        [currentSong]
    );

    const togglePlay = useCallback(async () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (!currentSong) {
            if (librarySongs.length > 0) {
                await playSong(librarySongs[0]);
            }

            return;
        }

        if (audio.paused) {
            try {
                await audio.play();
            } catch (error) {
                console.error("Audio playback error:", error);
            }
        } else {
            audio.pause();
        }
    }, [currentSong, librarySongs, playSong]);

    const seekTo = useCallback((time) => {
        const audio = audioRef.current;

        if (!audio || !Number.isFinite(audio.duration)) return;

        const nextTime = Math.max(
            0,
            Math.min(time, audio.duration)
        );

        audio.currentTime = nextTime;
        setCurrentTime(nextTime);
    }, []);

    const nextSong = useCallback(() => {
        if (!librarySongs.length) return;

        const index = librarySongs.findIndex(
            (song) => song.id === currentSong?.id
        );

        const nextIndex =
            index < 0 ? 0 : (index + 1) % librarySongs.length;

        playSong(librarySongs[nextIndex]);
    }, [currentSong, librarySongs, playSong]);

    const prevSong = useCallback(() => {
        if (!librarySongs.length) return;

        const index = librarySongs.findIndex(
            (song) => song.id === currentSong?.id
        );

        const prevIndex =
            index < 0
                ? 0
                : (index - 1 + librarySongs.length) %
                librarySongs.length;

        playSong(librarySongs[prevIndex]);
    }, [currentSong, librarySongs, playSong]);

    return (
        <PlayerContext.Provider
            value={{
                librarySongs,
                currentSong,
                setCurrentSong,
                isPlaying,
                currentTime,
                duration,
                volume,
                setVolume,
                playSong,
                togglePlay,
                seekTo,
                nextSong,
                prevSong,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error(
            "usePlayer must be used inside PlayerProvider"
        );
    }

    return context;
}