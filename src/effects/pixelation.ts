export function applyPixelation(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  blockSize: number,
): void {
  if (blockSize <= 1) return;
  const w = Math.max(1, Math.floor(width / blockSize));
  const h = Math.max(1, Math.floor(height / blockSize));

  const prevSmoothing = ctx.imageSmoothingEnabled;
  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(ctx.canvas, 0, 0, width, height, 0, 0, w, h);
  ctx.drawImage(ctx.canvas, 0, 0, w, h, 0, 0, width, height);

  ctx.imageSmoothingEnabled = prevSmoothing;
}
