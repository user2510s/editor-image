import clamp from "../utils/clamp";
import mulberry32 from "../utils/mulberry32";

export function applyNoise(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number,
  seed = 1,
): void {
  if (amount <= 0) return;
  const rand = mulberry32(seed);
  const imgData = ctx.getImageData(0, 0, width, height);
  const d = imgData.data;
  const strength = (amount / 100) * 90;

  for (let i = 0; i < d.length; i += 4) {
    const n = (rand() - 0.5) * strength;
    d[i] = clamp(d[i] + n);
    d[i + 1] = clamp(d[i + 1] + n);
    d[i + 2] = clamp(d[i + 2] + n);
  }
  ctx.putImageData(imgData, 0, 0);
}
