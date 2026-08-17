import {
  ChevronDown,
  Expand,
  LocateFixed,
  Minus,
  Plus,
} from "lucide-react";

const fields = [
  {
    id: 1,
    className: "field-a",
    score: "8",
  },
  {
    id: 2,
    className: "field-b",
    score: "2",
  },
  {
    id: 3,
    className: "field-c",
    score: "3",
  },
  {
    id: 4,
    className: "field-d",
    score: "9",
  },
  {
    id: 5,
    className: "field-e",
    score: "5",
  },
  {
    id: 6,
    className: "field-f",
    score: "9",
  },
  {
    id: 7,
    className: "field-g",
    score: "12",
  },
  {
    id: 8,
    className: "field-h",
    score: "7",
  },
  {
    id: 9,
    className: "field-i",
    score: "11",
  },
  {
    id: 10,
    className: "field-j",
    score: "12",
  },
];

function FarmOverviewMap() {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-[0_4px_16px_rgba(15,23,42,0.035)]
      "
    >
      {/* Header */}

      <div
        className="
          flex
          h-[43px]
          items-center
          justify-between
          border-b
          border-[var(--color-border)]
          px-3.5
        "
      >
        <h2
          className="
            text-[12px]
            font-bold
            text-[var(--color-text-primary)]
          "
        >
          Farm Overview Map
        </h2>

        <div className="flex items-center gap-1.5">

          <button
            className="
              flex
              h-7
              items-center
              gap-2
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              px-2
              text-[8px]
              font-semibold
              text-[var(--color-text-primary)]
            "
          >
            Health Index

            <ChevronDown size={11} />
          </button>

          <button
            className="
              hidden
              h-7
              items-center
              gap-2
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              px-2
              text-[8px]
              font-semibold
              text-[var(--color-text-primary)]

              sm:flex
            "
          >
            Satellite

            <ChevronDown size={11} />
          </button>

          <button
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              border
              border-[var(--color-border)]
              text-[var(--color-text-secondary)]
            "
          >
            <Expand size={13} />
          </button>

        </div>
      </div>

      {/* Map */}

      <div
        className="
          relative
          h-[300px]
          overflow-hidden

          sm:h-[330px]

          xl:h-[300px]
        "
      >
        {/* Satellite background */}

        <div
          className="
            absolute
            inset-0
            bg-[#526f43]
          "
        />

        {/* Agricultural texture */}

        <div
          className="
            absolute
            inset-0
            opacity-90
            [background-image:linear-gradient(25deg,transparent_45%,rgba(255,255,255,.12)_46%,transparent_48%),linear-gradient(110deg,transparent_45%,rgba(0,0,0,.12)_46%,transparent_48%)]
            [background-size:90px_70px,120px_95px]
          "
        />

        {/* Fields */}

        {fields.map((field) => (
          <div
            key={field.id}
            className={`
              farm-field
              ${field.className}
            `}
          >
            <span>{field.score}</span>
          </div>
        ))}

        {/* Dark gradient */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.12))]
          "
        />

        {/* Legend */}

        <div
          className="
            absolute
            bottom-3
            left-3
            rounded-xl
            border
            border-white/20
            bg-black/60
            px-3
            py-2.5
            text-white
            backdrop-blur-md
          "
        >
          <div className="space-y-1.5">

            {[
              ["#22c55e", "Excellent (80–100%)"],
              ["#4ade80", "Good (60–79%)"],
              ["#facc15", "Moderate (40–59%)"],
              ["#f97316", "Poor (20–39%)"],
              ["#ef4444", "Critical (0–19%)"],
            ].map(([color, label]) => (
              <div
                key={label}
                className="flex items-center gap-2"
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                  "
                  style={{
                    backgroundColor: color,
                  }}
                />

                <span className="text-[8px] font-medium">
                  {label}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* Map controls */}

        <div
          className="
            absolute
            right-3
            bottom-3
            flex
            flex-col
            overflow-hidden
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-lg
          "
        >
          <button
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              text-[var(--color-text-primary)]
              hover:bg-[var(--color-surface-secondary)]
            "
          >
            <Plus size={15} />
          </button>

          <div className="h-px bg-[var(--color-border)]" />

          <button
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              text-[var(--color-text-primary)]
              hover:bg-[var(--color-surface-secondary)]
            "
          >
            <Minus size={15} />
          </button>

          <div className="h-px bg-[var(--color-border)]" />

          <button
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              text-[var(--color-text-primary)]
              hover:bg-[var(--color-surface-secondary)]
            "
          >
            <LocateFixed size={14} />
          </button>
        </div>
      </div>

      {/* Field CSS */}

      <style>{`
        .farm-field {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255,255,255,.9);
          box-shadow:
            inset 0 0 20px rgba(255,255,255,.08),
            0 0 8px rgba(0,0,0,.15);
          color: white;
          font-size: 8px;
          font-weight: 800;
        }

        .farm-field span {
          display: flex;
          width: 18px;
          height: 18px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(255,255,255,.95);
          color: #25352a;
          box-shadow: 0 2px 6px rgba(0,0,0,.25);
        }

        .field-a {
          left: 5%;
          top: 25%;
          width: 20%;
          height: 27%;
          background: rgba(234,179,8,.60);
          clip-path: polygon(5% 15%, 85% 0, 100% 75%, 30% 100%, 0 65%);
        }

        .field-b {
          left: 26%;
          top: 7%;
          width: 19%;
          height: 31%;
          background: rgba(34,197,94,.55);
          clip-path: polygon(10% 0, 100% 10%, 90% 95%, 0 80%);
        }

        .field-c {
          left: 44%;
          top: 8%;
          width: 20%;
          height: 30%;
          background: rgba(34,197,94,.60);
          clip-path: polygon(5% 10%, 90% 0, 100% 75%, 15% 100%);
        }

        .field-d {
          left: 30%;
          top: 40%;
          width: 20%;
          height: 34%;
          background: rgba(249,115,22,.66);
          clip-path: polygon(0 15%, 80% 0, 100% 80%, 25% 100%);
        }

        .field-e {
          left: 50%;
          top: 36%;
          width: 20%;
          height: 32%;
          background: rgba(34,197,94,.55);
          clip-path: polygon(0 5%, 90% 0, 100% 80%, 20% 100%);
        }

        .field-f {
          left: 68%;
          top: 12%;
          width: 20%;
          height: 29%;
          background: rgba(234,179,8,.58);
          clip-path: polygon(0 10%, 90% 0, 100% 85%, 10% 100%);
        }

        .field-g {
          left: 72%;
          top: 45%;
          width: 19%;
          height: 31%;
          background: rgba(239,68,68,.65);
          clip-path: polygon(5% 0, 100% 15%, 90% 100%, 0 75%);
        }

        .field-h {
          left: 9%;
          top: 58%;
          width: 25%;
          height: 28%;
          background: rgba(34,197,94,.50);
          clip-path: polygon(0 10%, 90% 0, 100% 75%, 20% 100%);
        }

        .field-i {
          left: 48%;
          top: 65%;
          width: 23%;
          height: 25%;
          background: rgba(234,179,8,.58);
          clip-path: polygon(5% 0, 100% 20%, 85% 100%, 0 75%);
        }

        .field-j {
          left: 77%;
          top: 65%;
          width: 18%;
          height: 23%;
          background: rgba(34,197,94,.50);
          clip-path: polygon(0 0, 100% 15%, 90% 100%, 10% 85%);
        }
      `}</style>
    </div>
  );
}

export default FarmOverviewMap;