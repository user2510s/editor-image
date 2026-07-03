type PreviewProps = {
  previewRef: React.RefObject<HTMLCanvasElement | null>;
  size: number;
};

export default function Preview({ previewRef, size }: PreviewProps) {
  return (
    <div className="flex min-w-fit max-w-sm items-center justify-center overflow-hidden rounded-[28px] border border-zinc-800 bg-black shadow-[0_8px_30px_rgba(0,0,0,0.45)] h-150 lg:max-h-150">
      <canvas
        ref={previewRef}
        className="[image-rendering:pixelated] animation"
        style={{
          width: `${size}%`,
          height: `${size}%`,
        }}
      />
    </div>
  );
}
