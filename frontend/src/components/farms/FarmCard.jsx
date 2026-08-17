import {
  Ellipsis,
  MapPin,
  Sprout,
} from "lucide-react";

import FarmSparkline from "./FarmSparkline";

function FarmCard({ farm }) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[16px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-[0_3px_14px_rgba(23,32,26,0.045)]
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-[var(--color-border-hover)]
        hover:shadow-[0_8px_24px_rgba(23,32,26,0.08)]
      "
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="relative h-[145px] overflow-hidden">
        <img
          src={farm.image}
          alt={farm.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-[1.035]
          "
        />

        {/* Image overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/25
            via-transparent
            to-black/5
          "
        />

        {/* STATUS */}

        <span
          className="
            absolute
            right-2.5
            top-2.5
            rounded-full
            border
            border-white/30
            bg-[var(--color-success)]
            px-2
            py-1
            text-[8px]
            font-bold
            text-white
            shadow-sm
          "
        >
          {farm.status}
        </span>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="p-3">
        {/* NAME */}

        <div>
          <h3
            className="
              text-[13px]
              font-bold
              tracking-[-0.2px]
              text-[var(--color-text-primary)]
            "
          >
            {farm.name}
          </h3>

          <div
            className="
              mt-1
              flex
              items-center
              gap-1
              text-[9px]
              font-medium
              text-[var(--color-text-secondary)]
            "
          >
            <MapPin size={11} />
            {farm.location}
          </div>
        </div>

        {/* =================================================
            META
        ================================================= */}

        <div
          className="
            mt-4
            grid
            grid-cols-3
            divide-x
            divide-[var(--color-border)]
            border-y
            border-[var(--color-border)]
            py-2.5
          "
        >
          <Meta
            label="Area"
            value={farm.area}
          />

          <Meta
            label="Fields"
            value={farm.fields}
          />

          <Meta
            label="Main Crop"
            value={farm.crop}
          />
        </div>

        {/* =================================================
            HEALTH
        ================================================= */}

        <div className="mt-3">
          <p
            className="
              text-[9px]
              font-medium
              text-[var(--color-text-secondary)]
            "
          >
            Health Score
          </p>

          <div className="mt-1.5 flex items-center justify-between gap-2">
            {/* SCORE */}

            <div className="flex items-center gap-2">
              <div
                className="
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--color-primary)]/8
                "
              >
                <div
                  className="
                    absolute
                    inset-[3px]
                    rounded-full
                    border-[2.5px]
                    border-[var(--color-primary)]/15
                    border-t-[var(--color-primary)]
                    border-r-[var(--color-primary)]
                    -rotate-45
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-extrabold
                    text-[var(--color-primary)]
                  "
                >
                  {farm.health}%
                </span>
              </div>

              <span
                className="
                  text-[9px]
                  font-bold
                  text-[var(--color-primary)]
                "
              >
                {farm.healthText}
              </span>
            </div>

            <FarmSparkline
              points={farm.trend}
            />
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="mt-4 flex items-center gap-1.5">
          <button
            type="button"
            className="
              h-8
              flex-1
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              text-[9px]
              font-bold
              text-[var(--color-primary)]
              transition-all
              hover:border-[var(--color-primary)]/30
              hover:bg-[var(--color-primary)]/6
            "
          >
            View Farm
          </button>

          <button
            type="button"
            className="
              h-8
              flex-1
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              text-[9px]
              font-bold
              text-[var(--color-primary)]
              transition-all
              hover:border-[var(--color-primary)]/30
              hover:bg-[var(--color-primary)]/6
            "
          >
            Manage
          </button>

          <button
            type="button"
            aria-label="More options"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-[var(--color-border)]
              text-[var(--color-text-secondary)]
              transition-all
              hover:bg-[var(--color-surface-secondary)]
              hover:text-[var(--color-text-primary)]
            "
          >
            <Ellipsis size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function Meta({ label, value }) {
  return (
    <div className="min-w-0 px-2 first:pl-0 last:pr-0">
      <p
        className="
          text-[8px]
          font-medium
          text-[var(--color-text-muted)]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          truncate
          text-[10px]
          font-bold
          text-[var(--color-text-primary)]
        "
      >
        {value}
      </p>
    </div>
  );
}

export default FarmCard;