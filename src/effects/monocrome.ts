import clamp from "../utils/clamp";

export function applyMonochrome(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number,
  hex: string,
): void {
  if (intensity <= 0) return;
  const t = intensity / 100;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const imgData = ctx.getImageData(0, 0, width, height);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    const tonedR = (lum / 255) * r;
    const tonedG = (lum / 255) * g;
    const tonedB = (lum / 255) * b;
    d[i] = clamp(d[i] * (1 - t) + tonedR * t);
    d[i + 1] = clamp(d[i + 1] * (1 - t) + tonedG * t);
    d[i + 2] = clamp(d[i + 2] * (1 - t) + tonedB * t);
  }
  ctx.putImageData(imgData, 0, 0);
}
