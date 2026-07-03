import PRESETS, { type PresetKey } from "../constants/presets";
import type DEFAULT_PARAMS from "../constants/defaultParams";
import { RotateCcw } from "lucide-react";
import CONTROL_GROUPS from "../constants/contolGrups";

type Params = typeof DEFAULT_PARAMS;

type CSSVars = React.CSSProperties & {
  "--slider-progress"?: string;
};

type AsideProps = {
  params: Params;
  activePreset: PresetKey | null;

  applyPreset: (preset: PresetKey) => void;
  resetParams: () => void;

  updateParam: <K extends keyof Params>(key: K, value: Params[K]) => void;
};

export default function Anside({
  activePreset,
  applyPreset,
  resetParams,
  updateParam,
  params,
}: AsideProps) {
  return (
    <aside className="flex min-h-0 flex-col gap-5 overflow-y-auto bg-primary-foreground p-5 lg:bg-primary-foreground">
      <div className="grid grid-cols-2 gap-2.5">
        {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
          <button
            key={key}
            onClick={() => applyPreset(key)}
            className={`rounded-3xl px-3 py-3 text-xs font-medium capitalize transition-colors animation ${
              activePreset === key
                ? "rounded-md bg-primary-foreground border-2 border-primary text-primary font-extrabold animation "
                : " bg-primary text-zinc-950 font-bold  hover:bg-secondary-foreground hover:py-4 hover:rounded-xl animation"
            }`}
          >
            {key}
          </button>
        ))}
        <button
          onClick={resetParams}
          className="col-span-2 mt-4 rounded-2xl bg-destructive py-3 text-xs font-medium text-destructive-foreground transition-colors hover:rounded-xl hover:py-4 animation"
        >
          <span className="inline-flex items-center gap-1.5">
            <RotateCcw size={15} />
            resetar
          </span>
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-background px-4 py-3">
        <div className="relative size-9 overflow-hidden rounded-full border border-zinc-700">
          <input
            id="whiteHex"
            type="color"
            value={params.whiteHex}
            onChange={(e) => {
              updateParam("whiteHex", e.target.value);
            }}
            className="absolute -left-1.5 -top-1.5 size-12 cursor-pointer border-0 bg-transparent p-0 "
          />
        </div>
        <label htmlFor="whiteHex" className="flex-1 text-xs text-zinc-400 ">
          cor base
        </label>
      </div>

      {CONTROL_GROUPS.map((group) => (
        <fieldset
          key={group.title}
          className="rounded-2xl border border-zinc-800 bg-background px-5 pb-6 pt-1"
        >
          <legend className="-ml-1 mb-1 px-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground/90">
            {group.title}
          </legend>
          {group.controls.map((c) => (
            <div key={c.key} className="mt-3 flex flex-col gap-3 first:mt-0">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={c.key}
                  className="text-xs mb-2 font-medium text-secondary-foreground"
                >
                  {c.label}
                </label>

                <span className="font-mono text-xs tabular-nums text-zinc-300">
                  {params[c.key]}
                </span>
              </div>

              <input
                id={c.key}
                type="range"
                min={c.min}
                max={c.max}
                value={params[c.key]}
                onChange={(e) => updateParam(c.key, Number(e.target.value))}
                className="m3-slider w-full"
                style={
                  {
                    "--slider-progress": `${((Number(params[c.key]) - c.min) / (c.max - c.min)) * 100}%`,
                  } as CSSVars
                }
              />
            </div>
          ))}
        </fieldset>
      ))}
    </aside>
  );
}
