import clamp from "../utils/clamp";
import mulberry32 from "../utils/mulberry32";

export function applyPatchyContrast(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number,
  seed = 7,
): void {
  if (amount <= 0) return;
  const rand = mulberry32(seed);
  const cell = 32; // tamanho das "manchas"
  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);

  const mask = new Float32Array(cols * rows);
  for (let i = 0; i < mask.length; i++) mask[i] = rand();

  const imgData = ctx.getImageData(0, 0, width, height);
  const d = imgData.data;
  const maxReduction = amount / 100;

  for (let y = 0; y < height; y++) {
    const cy = Math.floor(y / cell);
    for (let x = 0; x < width; x++) {
      const cx = Math.floor(x / cell);
      const m = mask[cy * cols + cx];
      if (m < 0.55) continue; // só parte das células recebe a mancha
      const localFactor = 1 - maxReduction * ((m - 0.55) / 0.45);
      const i = (y * width + x) * 4;
      for (let c = 0; c < 3; c++) {
        const v = d[i + c];
        d[i + c] = clamp(128 + (v - 128) * localFactor);
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
}
