export const getRandomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

export const playSoundAndRedirect = async (
  sound: string,
  url: string,
  onEnd: () => void
) => {
  try {
    const audio = new Audio(sound);
    await audio.play();
    audio.onended = () => {
      window.location.href = url;
    };
  } catch (e) {
    console.error("Audio error:", e);
    window.location.href = url;
  } finally {
    onEnd();
  }
};

export const isVideo = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};