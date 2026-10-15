import { useContext, createContext, useState, useEffect, useRef } from "react";

const PlayerContext = createContext(null);

const initialSongs = [
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
]

function PlayerProvider({ children }) {
    const [audioRef, setAudioRef] = useState(null);

    const [librarySongs, setLibrarySongs] = useState(initialSongs);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);

    //Create one shared audio player
    useEffect(() => {
        const audio = new Audio();
        audio.preload = "metadata";
        audio.volume = 0.7;
        audioRef.current = audio;

        const updateTime = () => setCurrentTime(audio.currentTime);

        const updateDuration = () => {
            setDuration(
                Number.isFinite(audio.duration) ? audio.duration : 0
            )
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        }

        const handlePlay = () => setIsPlaying(false);
        const handlePause = () => setIsPlaying(false);

        return () => {
            audio.addEventListener("timeupdate", updateTime);
            audio.addEventListener("loadedmetadata", updateDuration);
            audio.addEventListener("durationchange", updateDuration);
            audio.addEventListener("ended", handleEnded);
            audio.addEventListener("play", handlePlay);
            audio.addEventListener("pause", handlePause);
            audioRef.current = null;
        }
    }, [])

}
