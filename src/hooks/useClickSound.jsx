import { useCallback } from "react";

export default function useClickSound() {
  const clickAudio = document.getElementById("click-sound");

  const playClickSound = useCallback(() => {
    const sound = clickAudio.cloneNode();
    sound.play().catch((e) => {
      console.log(e);
      // Ignore autoplay issues silently
    });
  }, []);

  return playClickSound;
}
