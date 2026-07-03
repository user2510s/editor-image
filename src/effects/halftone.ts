export function applyHalftone(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  dotSize: number,
  intensity: number,
  hex: string,
): void {
  if (intensity <= 0 || dotSize <= 1) return;
  const src = ctx.getImageData(0, 0, width, height);
  const sData = src.data;
  const t = intensity / 100;

  const overlay = document.createElement("canvas");
  overlay.width = width;
  overlay.height = height;
  const octx = overlay.getContext("2d");
  if (!octx) return;
  octx.fillStyle = "#000000";
  octx.fillRect(0, 0, width, height);
  octx.fillStyle = hex;

  for (let y = 0; y < height; y += dotSize) {
    for (let x = 0; x < width; x += dotSize) {
      // luminância média
      const i =
        (Math.min(y + Math.floor(dotSize / 2), height - 1) * width +
          Math.min(x + Math.floor(dotSize / 2), width - 1)) *
        4;
      const lum =
        (0.299 * sData[i] + 0.587 * sData[i + 1] + 0.114 * sData[i + 2]) / 255;
      const radius = (dotSize / 2) * lum * 1.05;
      if (radius <= 0.2) continue;
      octx.beginPath();
      octx.arc(x + dotSize / 2, y + dotSize / 2, radius, 0, Math.PI * 2);
      octx.fill();
    }
  }

  ctx.save();
  ctx.globalAlpha = t;
  ctx.globalCompositeOperation = "screen";
  ctx.drawImage(overlay, 0, 0);
  ctx.restore();
}
