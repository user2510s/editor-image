import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

type ControllsProps = {
  zoomIn: () => void;
  restoreZoom: () => void;
  removedZoom: () => void;
};

export default function Controls({
  zoomIn,
  restoreZoom,
  removedZoom,
}: ControllsProps) {
  return (
    <div className="flex w-full justify-center gap-2 p-4">
      <button
        className="rounded-l-2xl rounded-r-md bg-primary px-5 py-1 text-secondary animation hover:px-7 active:px-9"
        onClick={zoomIn}
      >
        <ZoomIn size={20} />
      </button>

      <button
        className="rounded-md bg-primary px-5 py-1.5 text-secondary animation hover:px-7 active:px-9 active:rounded-sm"
        onClick={restoreZoom}
      >
        <RotateCcw size={18} />
      </button>

      <button
        className="rounded-r-2xl rounded-l-md bg-primary px-5 py-1 text-secondary animation hover:px-7 active:px-9"
        onClick={removedZoom}
      >
        <ZoomOut size={20} />
      </button>
    </div>
  );
}
