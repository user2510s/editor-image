import clamp from "../utils/clamp";
import hslToRgb from "../utils/hslToRgb";
import rgbToHsl from "../utils/rgbToHsl";

export function applySaturation(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number,
): void {
  if (intensity === 0) return;

  const factor = intensity / 100;

  const imgData = ctx.getImageData(0, 0, width, height);
  const d = imgData.data;

  for (let i = 0; i < d.length; i += 4) {
    const { h, s, l } = rgbToHsl(d[i], d[i + 1], d[i + 2]);

    const newS = clamp(s * (1 + factor), 0, 1);

    const rgb = hslToRgb(h, newS, l);

    d[i] = rgb.r;
    d[i + 1] = rgb.g;
    d[i + 2] = rgb.b;
  }

  ctx.putImageData(imgData, 0, 0);
}
