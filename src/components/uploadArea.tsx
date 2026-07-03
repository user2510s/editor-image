import { Upload } from "lucide-react";

type UploadAreaProps = {
  onClick: () => void;
};

export default function UploadArea({ onClick }: UploadAreaProps) {
  return (
    <div
      onClick={onClick}
      className="flex w-full max-w-xl cursor-pointer flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-zinc-700 bg-muted/30 px-8 py-16 text-center transition-colors hover:border-primary/60 hover:bg-muted/50"
    >
      <div
        className="flex size-16 items-center justify-center rounded-full bg-background text-primary"
        style={{
          clipPath:
            "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
        }}
      >
        <Upload size={18} />
      </div>

      <div>
        <p className="text-base font-medium text-primary">Carregar imagem</p>

        <p className="mt-1 text-sm text-primary/50">
          Clique ou arraste um arquivo .png / .jpg aqui
        </p>
      </div>
    </div>
  );
}
