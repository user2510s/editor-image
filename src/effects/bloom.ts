export function applyBloom(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  threshold: number,
  intensity: number,
): void {
  if (intensity <= 0) return;
  const src = ctx.getImageData(0, 0, width, height);
  const sData = src.data;

  const bright = document.createElement("canvas");
  bright.width = width;
  bright.height = height;
  const bctx = bright.getContext("2d");
  if (!bctx) return;
  const brightData = bctx.createImageData(width, height);
  const bd = brightData.data;
  const thresh = (threshold / 100) * 255;

  for (let i = 0; i < sData.length; i += 4) {
    const lum = 0.299 * sData[i] + 0.587 * sData[i + 1] + 0.114 * sData[i + 2];
    if (lum > thresh) {
      const f = (lum - thresh) / (255 - thresh + 1);
      bd[i] = sData[i] * f;
      bd[i + 1] = sData[i + 1] * f;
      bd[i + 2] = sData[i + 2] * f;
      bd[i + 3] = 255;
    } else {
      bd[i + 3] = 0;
    }
  }
  bctx.putImageData(brightData, 0, 0);

  const blurPx = 2 + (intensity / 100) * 14;
  bctx.filter = `blur(${blurPx}px)`;
  bctx.globalCompositeOperation = "source-over";
  bctx.drawImage(bright, 0, 0);

  ctx.save();
  ctx.globalAlpha = Math.min(1, intensity / 70);
  ctx.globalCompositeOperation = "screen";
  ctx.drawImage(bright, 0, 0);
  ctx.restore();
}
