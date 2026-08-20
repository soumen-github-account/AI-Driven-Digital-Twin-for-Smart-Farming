import { ArrowRight, MapPin } from "lucide-react";

export default function ActiveFarmCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Active Farm
      </p>

      <div className="flex gap-3">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300"
          alt="Green Valley Farm"
          className="h-14 w-14 rounded-xl object-cover"
        />

        <div>
          <h3 className="text-sm font-semibold">
            Green Valley Farm
          </h3>

          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={12} />
            West Bengal, India
          </p>

          <p className="mt-1 text-xs text-slate-500">
            245.6 ha
          </p>
        </div>
      </div>

      <button className="mt-4 flex items-center gap-2 text-xs font-semibold text-green-700">
        View Farm Details
        <ArrowRight size={14} />
      </button>
    </div>
  );
}