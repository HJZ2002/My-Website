import { useEffect, useRef, useState } from 'react';

const BGM_SRC =
  '/music/Astrum Unicum  Stars, Rebirth, and You Piano Tutorial  - Sheet Music - Shorekeeper Theme.mp3';

export default function AudioToggle() {
  const audioRef = useRef(null);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const bgm = audioRef.current;
    if (!bgm) return;

    const savedVol = localStorage.getItem('bgmVol');
    bgm.volume = savedVol ? Math.min(1, Math.max(0, parseFloat(savedVol))) : 0.4;

    const tryPlay = async () => {
      try {
        bgm.muted = false;
        await bgm.play();
        setIsOn(true);
      } catch {
        try {
          bgm.muted = true;
          await bgm.play();
        } catch {
          /* autoplay blocked */
        }
        setIsOn(false);
      }
    };

    tryPlay();

    const onVisibility = async () => {
      if (!document.hidden) {
        try {
          bgm.muted = false;
          await bgm.play();
          setIsOn(true);
        } catch {
          /* ignore */
        }
      }
    };

    const onVolumeChange = () => {
      localStorage.setItem('bgmVol', String(bgm.volume));
    };

    document.addEventListener('visibilitychange', onVisibility);
    bgm.addEventListener('volumechange', onVolumeChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      bgm.removeEventListener('volumechange', onVolumeChange);
    };
  }, []);

  const toggle = async () => {
    const bgm = audioRef.current;
    if (!bgm) return;

    if (bgm.paused) {
      try {
        bgm.muted = false;
        await bgm.play();
        setIsOn(true);
      } catch {
        /* ignore */
      }
      return;
    }

    const willMute = !bgm.muted;
    bgm.muted = willMute;
    setIsOn(!willMute);
  };

  return (
    <>
      <audio ref={audioRef} src={BGM_SRC} preload="auto" loop playsInline />
      <button
        type="button"
        className="audio-toggle"
        aria-label={isOn ? 'Mute site music' : 'Unmute site music'}
        title={isOn ? 'Mute site music' : 'Unmute site music'}
        onClick={toggle}
      >
        <i className={`bx ${isOn ? 'bx-volume-full' : 'bx-volume-mute'}`} aria-hidden="true" />
      </button>
    </>
  );
}
