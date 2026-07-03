import { useState } from "react";

export function useZoom(initial = 100) {
  const zoomForce = 30;

  const [zoom, setZoom] = useState(initial);

  const zoomIn = () => setZoom((z) => z + zoomForce);

  const zoomOut = () => setZoom((z) => Math.max(100, z - zoomForce));

  const resetZoom = () => setZoom(initial);

  return {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
  };
}
