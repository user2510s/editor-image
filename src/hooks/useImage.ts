import { useCallback, useRef, useState } from "react";

const MAX_DIMENSION = 1000;
export function useImage() {
  const sourceCanvasRef = useRef<HTMLCanvasElement>(
    document.createElement("canvas"),
  );

  const [dims, setDims] = useState({
    width: 0,
    height: 0,
  });

  const loadImage = useCallback((file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      let w = img.naturalWidth;
      let h = img.naturalHeight;

      const scale = Math.min(1, MAX_DIMENSION / Math.max(w, h));

      w = Math.round(w * scale);
      h = Math.round(h * scale);

      const srcCanvas = sourceCanvasRef.current;
      srcCanvas.width = w;
      srcCanvas.height = h;

      const ctx = srcCanvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(img, 0, 0, w, h);

      setDims({
        width: w,
        height: h,
      });

      URL.revokeObjectURL(url);
    };

    img.src = url;
  }, []);

  return {
    dims,
    loadImage,
    sourceCanvasRef,
  };
}
