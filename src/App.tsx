import "./css/App.css";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { renderFrame } from "./utils/renderFrame";

import { useZoom } from "./hooks/useZoom";
import { useImage } from "./hooks/useImage";
import { ActivePreset } from "./hooks/activePreset";

import Controls from "./components/controlls";
import Header from "./components/header";
import UploadArea from "./components/uploadArea";
import Preview from "./components/preview";
import ActionsControlls from "./components/actions-controlls";
import Anside from "./components/anside";

function App() {
  const [seed, setSeed] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const { dims, loadImage, sourceCanvasRef } = useImage();

  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();

  const { params, activePreset, applyPreset, resetParams, updateParam } =
    ActivePreset();

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const rafRef = useRef<number | null>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    loadImage(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    loadImage(file);
  };
  const reroll = () => {
    setSeed((s) => s + 1);
  };

  useEffect(() => {
    if (!dims.width || !previewCanvasRef.current) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const canvas = previewCanvasRef.current;

      if (!canvas) return;

      canvas.width = dims.width;
      canvas.height = dims.height;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      renderFrame(
        sourceCanvasRef.current,
        ctx,
        dims.width,
        dims.height,
        params,
        seed,
      );
    });

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [params, dims, seed, sourceCanvasRef]);

  const handleDownload = () => {
    const canvas = previewCanvasRef.current;

    if (!canvas) return;

    const link = document.createElement("a");

    //const base = fileName ? fileName.replace(/\.[^.]+$/, "") : "imagem";

    const uuid = uuidv4();

    link.download = `${uuid}-CRT.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const hasImage = dims.width > 0;

  return (
    <div className="flex h-dvh w-full flex-col bg-background text-zinc-100">
      <Header /> {/*Header*/}
      <main className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_400px]">
        {/* Área de edição / preview */}
        <section
          className={`flex min-h-0 flex-col items-center justify-center gap-6 overflow-y-auto border-secondary p-6 transition-colors sm:p-10 lg:border-r ${
            isDragging ? "bg-primary/5" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {!hasImage && (
            <UploadArea onClick={() => fileInputRef.current?.click()} />
          )}

          {hasImage && <Preview previewRef={previewCanvasRef} size={zoom} />}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            hidden
          />

          {hasImage && (
            <div>
              {/*controles*/}

              <Controls
                zoomIn={zoomIn}
                restoreZoom={resetZoom}
                removedZoom={zoomOut}
              />
              <ActionsControlls
                onClickDownload={handleDownload}
                onClickFile={() => fileInputRef.current?.click()}
                onClickReroll={reroll}
              />
            </div>
          )}
        </section>

        {/* Painel de controles */}
        <Anside
          activePreset={activePreset}
          applyPreset={applyPreset}
          params={params}
          resetParams={resetParams}
          updateParam={updateParam}
        />
      </main>
    </div>
  );
}

export default App;
