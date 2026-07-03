import { ImageIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center gap-3 bg-primary-foreground px-4 sm:px-6">
      <div
        className="flex size-11 items-center justify-center bg-primary overflow-hidden rounded-sm"
        style={{
          clipPath:
            "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
        }}
      >
        <ImageIcon size={20} className="text-secondary" />
      </div>
      <div className="min-w-0">
        <h1 className="truncate font-display text-lg font-medium text-zinc-50">
          CRT <span className="text-primary"> - Editor Vintage</span>
        </h1>
        <p className="truncate text-xs text-primary/80">editor de imagem</p>
      </div>
    </header>
  );
}
