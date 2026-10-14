import { Plus } from "lucide-react";
import { useState } from "react";
import AddFieldDialog from "./AddFieldDialog";

export default function FieldsHeader({ totalFields, onSubmit }) {
    const [showAddField, setShowAddField] = useState(false);

  return (
    <section
      className="
        flex
        flex-col
        gap-[18px]
        lg:flex-row
        lg:items-start
        lg:justify-between
      "
    >
      <div>
        <div className="flex items-center gap-[10px]">
          <h1
            className="
              text-[30px]
              font-extrabold
              tracking-[-1.2px]
            "
          >
            Fields
          </h1>

          <span
            className="
              rounded-full
              border
              border-[var(--color-primary)]/20
              bg-[var(--color-primary)]/10
              px-[9px]
              py-[4px]
              text-[10px]
              font-bold
              text-[var(--color-primary)]
            "
          >
            {totalFields} Fields
          </span>
        </div>

        <p
          className="
            mt-[5px]
            text-[12px]
            text-[var(--color-text-secondary)]
          "
        >
          Monitor your fields, crops, soil and irrigation health.
        </p>
      </div>

      <button
      onClick={()=>setShowAddField(true)}
        className="
          flex
          h-[48px]
          items-center
          justify-center
          gap-[8px]
          rounded-[12px]
          bg-[var(--color-primary)]
          px-[18px]
          text-[12px]
          font-bold
          text-white
          shadow-[0_8px_24px_rgba(22,163,74,.20)]
          transition-all
          hover:-translate-y-[1px]
          hover:bg-[var(--color-primary-hover)]
        "
      >
        <Plus size={17} strokeWidth={2.5} />
        Add Field
      </button>
      {
        showAddField && <AddFieldDialog isOpen={showAddField} onClose={()=>setShowAddField(false)} onSubmit={onSubmit} />
      }
    </section>
  );
}