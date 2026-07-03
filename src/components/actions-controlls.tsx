import { ArrowLeftRight, Dice5, Download } from "lucide-react";

type ActionsControllsProps = {
  onClickFile: () => void;
  onClickReroll: () => void;
  onClickDownload: () => void;
};

export default function ActionsControlls({
  onClickFile,
  onClickDownload,
  onClickReroll,
}: ActionsControllsProps) {
  const btnOutlined =
    "flex h-10 items-center gap-2 rounded-r-lg rounded-l-[40px] border-2 border-primary px-5 hover:px-7 hover:py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-background";
  const btnText =
    "inline-flex h-10 items-center bg-primary rounded-md gap-2 px-5 hover:px-10 hover:py-3 text-sm font-medium text-background transition-colors hover:bg-background hover:text-primary";
  const btnFilled =
    "flex h-10 items-center justify-center gap-2 rounded-l-lg rounded-r-[40px] bg-muted px-7 hover:px-10 hover:py-3 text-sm font-semibold text-primary transition-colors";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button className={btnOutlined + " animation"} onClick={onClickFile}>
        <ArrowLeftRight size={15} />
        trocar imagem
      </button>
      <button className={btnText + " animation"} onClick={onClickReroll}>
        <Dice5 size={15} />
        re-sortear ruído
      </button>
      <button className={btnFilled + " animation"} onClick={onClickDownload}>
        <Download size={15} />
        baixar PNG
      </button>
    </div>
  );
}
