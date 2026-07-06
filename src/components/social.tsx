import { Coffee } from "lucide-react";
import github from "../assets/github-icon.svg";

export default function Social() {
  return (
    <div className="flex flex-col gap-3 justify-between bottom-4 left-4 lg:fixed ">
      <a
        href="https://buymeacoffee.com/riangoncalvesdev"
        className="flex items-center gap-2 border-2 border-primary p-2 w-fit rounded-md text-primary font-semibold justify-center"
        target="_blank"
      >
        <Coffee size={23} />
        <span>Buy me a coffe</span>
      </a>
      <a
        href="http://github.com/user2510s/editor-image"
        target="_blank"
        className="flex items-center gap-2 bg-primary font-semibold p-2 w-fit rounded-md text-zinc-950"
      >
        <img src={github} className="size-5" />
        <span>Github</span>
      </a>
    </div>
  );
}
