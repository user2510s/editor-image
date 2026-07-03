// effects.ts
// Pipeline de efeitos para o editor "CRT Verde Neon".
// Cada função recebe um CanvasRenderingContext2D (2D) e as dimensões do canvas
// de trabalho, e opera diretamente em cima do conteúdo já desenhado nele.

import { applyBloom } from "../effects/bloom";
import { applyDistortion } from "../effects/distortion";
import { applyHalftone } from "../effects/halftone";
import { applyMonochrome } from "../effects/monocrome";
import { applyNoise } from "../effects/noise";
import { applyPatchyContrast } from "../effects/patchyContrast";
import { applyPixelation } from "../effects/pixelation";
import { applySaturation } from "../effects/saturation";
import { applyScanlines } from "../effects/scanlines";
import { applyVignette } from "../effects/vignette";

// Parâmetros completos do pipeline de renderização.
export interface RenderParams {
  distortion: number;
  pixelSize: number;
  intensity: number;
  monochrome: number;
  whiteHex: string;
  lowContrast: number;
  noise: number;
  dotSize: number;
  halftone: number;
  bloomThreshold: number;
  bloom: number;
  scanlines: number;
  scanlineSpacing: number;
  vignette: number;
}
export function renderFrame(
  srcCanvas: HTMLCanvasElement,
  destCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  params: RenderParams,
  seed: number,
): void {
  // copia a imagem original para o canvas de trabalho
  destCtx.clearRect(0, 0, width, height);
  destCtx.drawImage(srcCanvas, 0, 0, width, height);

  applyDistortion(destCtx, width, height, params.distortion);
  applySaturation(destCtx, width, height, params.intensity);
  applyPixelation(destCtx, width, height, params.pixelSize);
  applyMonochrome(destCtx, width, height, params.monochrome, params.whiteHex);
  applyPatchyContrast(destCtx, width, height, params.lowContrast, seed + 7);
  applyNoise(destCtx, width, height, params.noise, seed);
  applyHalftone(
    destCtx,
    width,
    height,
    params.dotSize,
    params.halftone,
    params.whiteHex,
  );
  applyBloom(destCtx, width, height, params.bloomThreshold, params.bloom);
  applyScanlines(
    destCtx,
    width,
    height,
    params.scanlines,
    params.scanlineSpacing,
  );
  applyVignette(destCtx, width, height, params.vignette);
}
