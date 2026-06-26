import React, { useEffect, useRef, useState } from "react";

// Tautan YouTube untuk musik latar belakang
const YOUTUBE_URL = "https://www.youtube.com/watch?v=NsV9FVppR4w"; 
// Waktu mulai musik dalam detik (misal: 50 untuk mulai pada detik ke-50)
const START_TIME = 50; 

// Fungsi untuk mengekstrak Video ID dari URL YouTube
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
};

export default function MusicPlayer({ isPlaying, setIsPlaying }) {
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const videoId = getYouTubeId(YOUTUBE_URL);

  useEffect(() => {
    if (!videoId) return;

    // 1. Memuat YouTube Iframe Player API secara dinamis jika belum dimuat
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Callback setelah API selesai dimuat
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      // Pastikan elemen wadah sudah ada di DOM
      if (!document.getElementById("youtube-player")) return;

      playerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: videoId,
        playerVars: {
          autoplay: isPlaying ? 1 : 0,
          loop: 1,
          playlist: videoId, // Diperlukan agar looping bekerja pada pemutar YouTube
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          start: START_TIME, // Menentukan waktu mulai lagu
        },
        events: {
          onReady: (event) => {
            setIsReady(true);
            if (isPlaying) {
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            // Jika musik selesai (state = YT.PlayerState.ENDED), putar ulang dari detik ke-50
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(START_TIME);
              event.target.playVideo();
            }
          },
        },
      });
    }

    return () => {
      // Bersihkan pemutar saat komponen di-unmount
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Sinkronisasi status putar/jeda berdasarkan state isPlaying
  useEffect(() => {
    if (playerRef.current && isReady && typeof playerRef.current.playVideo === "function") {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, isReady]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center justify-center">
      {/* Wadah Tersembunyi untuk Iframe YouTube */}
      <div className="hidden">
        <div id="youtube-player"></div>
      </div>

      {/* Tombol Kontrol Melayang */}
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isPlaying ? "animate-spin-slow ring-4 ring-primary/30" : ""
        }`}
        aria-label="Toggle Background Music"
      >
        <span className="material-symbols-outlined text-2xl">
          {isPlaying ? "music_note" : "music_off"}
        </span>
      </button>
    </div>
  );
}
