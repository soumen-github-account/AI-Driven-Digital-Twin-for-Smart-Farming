import { Plus } from "lucide-react";

function FarmsHeader() {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div>
        <h1
          className="
            text-[24px]
            font-extrabold
            tracking-[-0.7px]
            text-[var(--color-text-primary)]
            sm:text-[26px]
          "
        >
          Farms
        </h1>

        <p
          className="
            mt-1
            text-[12px]
            font-medium
            text-[var(--color-text-secondary)]
          "
        >
          Manage your farms, fields and agricultural operations.
        </p>
      </div>

      <button
        type="button"
        className="
          inline-flex
          h-10
          w-fit
          items-center
          gap-2
          rounded-xl
          bg-[var(--color-primary)]
          px-4
          text-[11px]
          font-bold
          text-white
          shadow-[0_5px_16px_rgba(22,163,74,0.18)]
          transition-all
          duration-200
          hover:bg-[var(--color-primary-hover)]
          hover:shadow-[0_7px_20px_rgba(22,163,74,0.24)]
          active:scale-[0.98]
        "
      >
        <Plus size={16} strokeWidth={2.2} />
        Add Farm
      </button>
    </div>
  );
}

export default FarmsHeader;