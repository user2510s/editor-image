const clamp = (v: number, min = 0, max = 255): number =>
  Math.min(max, Math.max(min, v));

export default clamp;
