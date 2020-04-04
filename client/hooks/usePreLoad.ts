import { useEffect, useState } from "react"

export const usePreLoad = (files:{audio:Array<string>,img:Array<string>}) => {
  const [loaded, setLoaded] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const percent = Math.floor(loaded / (files.audio.length + files.img.length) * 100);
  useEffect(() => {
    files.audio.forEach(d => {
      const audio = new Audio();
      audio.src = d;
      audio.onloadeddata = () => {
        setLoaded(pre => pre + 1)
      }
    })
    files.img.forEach(d => {
      const img = new Image();
      img.src = d;
      img.onload = () => {
        setLoaded(pre => pre + 1)
      }
    })
  }, [])
  useEffect(() => {
    if (loaded === files.audio.length + files.img.length) {
      setTimeout(() => {
        setIsStart(true);
      }, 1000);
    }
  }, [loaded])

  return { percent, isStart };
}