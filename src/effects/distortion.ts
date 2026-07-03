export function applyDistortion(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number,
): void {
  if (amount <= 0) return;
  const src = ctx.getImageData(0, 0, width, height);
  const dst = ctx.createImageData(width, height);
  const sData = src.data;
  const dData = dst.data;

  const cx = width / 2;
  const cy = height / 2;
  const maxR = Math.sqrt(cx * cx + cy * cy);
  const k = (amount / 100) * 0.35; // força da distorção de barril

  for (let y = 0; y < height; y++) {
    const ny = (y - cy) / maxR;
    for (let x = 0; x < width; x++) {
      const nx = (x - cx) / maxR;
      const r2 = nx * nx + ny * ny;
      const factor = 1 + k * r2;

      let sx = Math.round(cx + nx * maxR * factor);
      const sy = Math.round(cy + ny * maxR * factor);

      // leve onda horizontal, lembrando instabilidade de sinal analógico
      sx += Math.round(
        Math.sin((y / height) * Math.PI * 6) * (amount / 100) * 3,
      );

      if (sx < 0 || sx >= width || sy < 0 || sy >= height) {
        const di = (y * width + x) * 4;
        dData[di] = 0;
        dData[di + 1] = 0;
        dData[di + 2] = 0;
        dData[di + 3] = 255;
        continue;
      }

      const si = (sy * width + sx) * 4;
      const di = (y * width + x) * 4;
      dData[di] = sData[si];
      dData[di + 1] = sData[si + 1];
      dData[di + 2] = sData[si + 2];
      dData[di + 3] = sData[si + 3];
    }
  }
  ctx.putImageData(dst, 0, 0);
}
