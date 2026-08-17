import { MapPin, Sprout } from "lucide-react";

function SelectedFarmCard() {
  return (
    <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-[0_5px_20px_rgba(0,0,0,0.035)]">
      <p className="text-[9px] font-bold text-[var(--color-text-primary)]">Selected Farm</p>

      <div className="mt-2.5 overflow-hidden rounded-xl border border-[var(--color-border)]">
        <div
          className="h-[82px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80')",
          }}
        />
      </div>

      <div className="mt-2.5 flex items-start gap-2">
        <Sprout size={15} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-[var(--color-text-primary)]">
            Green Valley Farm
          </p>
          <div className="mt-1 flex items-center gap-1 text-[8px] text-[var(--color-text-secondary)]">
            <MapPin size={10} />
            California, USA
          </div>
          <p className="mt-1 text-[9px] font-bold text-[var(--color-text-primary)]">78.5 ha</p>
        </div>
      </div>

      <button className="mt-2.5 text-[9px] font-bold text-[var(--color-primary)]">
        Switch Farm
      </button>
    </article>
  );
}

export default SelectedFarmCard;
