export function applyScanlines(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number,
  spacing: number,
): void {
  if (intensity <= 0) return;
  ctx.save();
  ctx.globalAlpha = intensity / 100;
  ctx.fillStyle = "#000000";
  for (let y = 0; y < height; y += spacing) {
    ctx.fillRect(0, y, width, Math.max(1, spacing * 0.4));
  }
  ctx.restore();
}
