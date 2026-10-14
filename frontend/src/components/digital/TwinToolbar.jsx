import {
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";

export default function TwinToolbar({
  onZoomIn,
  onZoomOut,
  onReset,
  onFit,
}) {
  return (
    <div
      className="
        absolute
        right-[18px]
        top-[18px]
        z-[20]
        flex
        flex-col
        overflow-hidden
        rounded-[12px]
        border
        border-black/5
        bg-white/90
        shadow-[0_8px_30px_rgba(15,23,42,.12)]
        backdrop-blur-xl
      "
    >
      <button
        onClick={onZoomIn}
        className="
          flex
          h-[38px]
          w-[38px]
          items-center
          justify-center
          border-b
          border-black/5
          text-slate-600
          transition
          hover:bg-slate-50
          hover:text-green-600
        "
      >
        <Plus size={15} />
      </button>

      <button
        onClick={onZoomOut}
        className="
          flex
          h-[38px]
          w-[38px]
          items-center
          justify-center
          border-b
          border-black/5
          text-slate-600
          transition
          hover:bg-slate-50
          hover:text-green-600
        "
      >
        <Minus size={15} />
      </button>

      <button
        onClick={onFit}
        className="
          flex
          h-[38px]
          w-[38px]
          items-center
          justify-center
          border-b
          border-black/5
          text-slate-600
          transition
          hover:bg-slate-50
          hover:text-green-600
        "
      >
        <Maximize2 size={14} />
      </button>

      <button
        onClick={onReset}
        className="
          flex
          h-[38px]
          w-[38px]
          items-center
          justify-center
          text-slate-600
          transition
          hover:bg-slate-50
          hover:text-green-600
        "
      >
        <RotateCcw size={14} />
      </button>
    </div>
  );
}