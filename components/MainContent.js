"use client"
import React from 'react'

const trendingSongs = [
    {
        title: "IYKYK",
        artists: "Jxggi, Dishant, Sickboi",
        explicit: true,
        color: "from-stone-400 to-stone-700",
    },
    {
        title: "HOME",
        artists: "Jokhay, Umair",
        explicit: true,
        color: "from-orange-700 to-neutral-900",
    },
    {
        title: "Barsaat",
        artists: "Banjaare, Roni",
        color: "from-neutral-200 to-neutral-400",
    },
    {
        title: "Alfaaz",
        artists: "Hamza Malik, Zain Zohaib",
        color: "from-red-300 to-red-500",
    },
    {
        title: "Tera Mera Rishta - New Version",
        artists: "Mithoon, Pritam, Mustafa Zahid, Sayeed...",
        color: "from-red-900 to-black",
    },
    {
        title: "Sadaayein",
        artists: "Samar Jafri",
        color: "from-neutral-300 to-neutral-500",
    },
];

const popularArtists = [
    { name: "Pritam", color: "from-neutral-700 to-neutral-900" },
    { name: "Afusic", color: "from-yellow-600 to-orange-800" },
    { name: "Atif Aslam", color: "from-neutral-300 to-neutral-500" },
    { name: "Shubh", color: "from-neutral-200 to-neutral-400" },
    { name: "Anuv Jain", color: "from-neutral-400 to-neutral-600" },
    { name: "Maanu", color: "from-stone-500 to-stone-700" },
];

const MainContent = () => {
    return (
        <div className="w-[70%] h-full bg-[#121212] text-white overflow-y-auto p-6">
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Trending songs</h2>
                    <button className="text-[#b8b8b8] hover:text-white text-sm font-bold">
                        Show all
                    </button>
                </div>
                <div className="flex gap-5 overflow-x-auto pb-2">
                    {trendingSongs.map((song) => (
                        <div
                            key={song.title}
                            className="w-[160px] shrink-0 cursor-pointer group"
                        >
                            <div
                                className={`w-[160px] h-[160px] rounded-md bg-gradient-to-br ${song.color} mb-3 shadow-lg group-hover:shadow-xl transition-shadow`}
                            />
                            <div className="flex items-center gap-1">
                                {song.explicit && (
                                    <span className="bg-[#b8b8b8] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-sm shrink-0">
                                        E
                                    </span>
                                )}
                                <h3 className="font-bold text-sm truncate">{song.title}</h3>
                            </div>
                            <p className="text-[#b8b8b8] text-xs truncate">{song.artists}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Popular artists</h2>
                    <button className="text-[#b8b8b8] hover:text-white text-sm font-bold">
                        Show all
                    </button>
                </div>
                <div className="flex gap-5 overflow-x-auto pb-2">
                    {popularArtists.map((artist) => (
                        <div
                            key={artist.name}
                            className="w-[160px] shrink-0 cursor-pointer text-center"
                        >
                            <div
                                className={`w-[160px] h-[160px] rounded-full bg-gradient-to-br ${artist.color} mb-3 shadow-lg`}
                            />
                            <h3 className="font-bold text-sm truncate">{artist.name}</h3>
                            <p className="text-[#b8b8b8] text-xs">Artist</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default MainContent
