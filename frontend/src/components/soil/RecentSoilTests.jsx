import {
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const tests = [
  {
    id: "ST-250513-02",
    date: "May 13, 2025",
    field: "Field 2",
    ph: "6.8",
    carbon: "2.3",
    nitrogen: "45",
    phosphorus: "22",
    potassium: "210",
    ec: "0.45",
    moisture: "32",
  },
  {
    id: "ST-250506-01",
    date: "May 06, 2025",
    field: "Field 1",
    ph: "6.6",
    carbon: "2.1",
    nitrogen: "48",
    phosphorus: "25",
    potassium: "198",
    ec: "0.48",
    moisture: "35",
  },
  {
    id: "ST-250429-03",
    date: "Apr 29, 2025",
    field: "Field 3",
    ph: "6.9",
    carbon: "2.4",
    nitrogen: "51",
    phosphorus: "29",
    potassium: "220",
    ec: "0.42",
    moisture: "31",
  },
];

function RecentSoilTests() {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-[0_4px_18px_rgba(0,0,0,0.025)]
      "
    >

      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[var(--color-border)]
          px-4
          py-3
        "
      >

        <h2 className="text-[12px] font-bold">
          Recent Soil Tests
        </h2>

        <button
          type="button"
          className="
            flex
            items-center
            gap-1
            text-[8px]
            font-bold
            text-[var(--color-primary)]
          "
        >
          View All
          <ArrowRight size={12} />
        </button>

      </div>

      {/* Desktop table */}

      <div className="hidden overflow-x-auto md:block">

        <table className="w-full min-w-[900px] border-collapse">

          <thead>
            <tr
              className="
                border-b
                border-[var(--color-border)]
                bg-[var(--color-surface-secondary)]
              "
            >

              {[
                "Sample ID",
                "Date",
                "Field",
                "pH",
                "Organic Carbon (%)",
                "N (kg/ha)",
                "P₂O₅ (kg/ha)",
                "K₂O (kg/ha)",
                "EC (dS/m)",
                "Moisture (%)",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="
                    whitespace-nowrap
                    px-3
                    py-2.5
                    text-left
                    text-[7px]
                    font-bold
                    text-[var(--color-text-secondary)]
                  "
                >
                  {head}
                </th>
              ))}

            </tr>
          </thead>

          <tbody>

            {tests.map((test) => (
              <tr
                key={test.id}
                className="
                  border-b
                  border-[var(--color-border)]
                  last:border-b-0
                  hover:bg-[var(--color-surface-secondary)]
                "
              >

                <Cell bold>
                  {test.id}
                </Cell>

                <Cell>{test.date}</Cell>

                <Cell bold>{test.field}</Cell>

                <Cell>{test.ph}</Cell>

                <Cell>{test.carbon}</Cell>

                <Cell>{test.nitrogen}</Cell>

                <Cell>{test.phosphorus}</Cell>

                <Cell>{test.potassium}</Cell>

                <Cell>{test.ec}</Cell>

                <Cell>{test.moisture}</Cell>

                <td className="px-3 py-3">

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-1
                      whitespace-nowrap
                      text-[8px]
                      font-bold
                      text-[var(--color-primary)]
                    "
                  >
                    View Report
                    <ChevronRight size={12} />
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="divide-y divide-[var(--color-border)] md:hidden">

        {tests.map((test) => (
          <div
            key={test.id}
            className="p-4"
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[10px] font-bold">
                  {test.id}
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    text-[var(--color-text-muted)]
                  "
                >
                  {test.date} • {test.field}
                </p>
              </div>

              <button
                type="button"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[var(--color-primary)]/10
                  text-[var(--color-primary)]
                "
              >
                <ChevronRight size={15} />
              </button>

            </div>

            <div
              className="
                mt-3
                grid
                grid-cols-3
                gap-2
              "
            >

              <MobileStat
                label="pH"
                value={test.ph}
              />

              <MobileStat
                label="Carbon"
                value={`${test.carbon}%`}
              />

              <MobileStat
                label="Nitrogen"
                value={`${test.nitrogen}`}
              />

              <MobileStat
                label="P₂O₅"
                value={`${test.phosphorus}`}
              />

              <MobileStat
                label="K₂O"
                value={`${test.potassium}`}
              />

              <MobileStat
                label="Moisture"
                value={`${test.moisture}%`}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

function Cell({ children, bold = false }) {
  return (
    <td
      className={`
        whitespace-nowrap
        px-3
        py-3
        text-[8px]
        ${
          bold
            ? "font-bold"
            : "text-[var(--color-text-secondary)]"
        }
      `}
    >
      {children}
    </td>
  );
}

function MobileStat({ label, value }) {
  return (
    <div
      className="
        rounded-lg
        bg-[var(--color-surface-secondary)]
        p-2
      "
    >
      <p
        className="
          text-[7px]
          text-[var(--color-text-muted)]
        "
      >
        {label}
      </p>

      <p className="mt-1 text-[10px] font-bold">
        {value}
      </p>
    </div>
  );
}

export default RecentSoilTests;