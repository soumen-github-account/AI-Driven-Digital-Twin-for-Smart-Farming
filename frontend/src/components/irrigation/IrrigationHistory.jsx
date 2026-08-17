const history = [
  ["May 12, 2025", "Field 3", "6:10 AM", "2.3 hrs", "3.4 m³"],
  ["May 11, 2025", "Field 1", "6:00 AM", "2.0 hrs", "2.8 m³"],
  ["May 10, 2025", "Field 4", "6:15 AM", "2.1 hrs", "2.6 m³"],
  ["May 8, 2025", "Field 2", "6:00 AM", "2.4 hrs", "3.2 m³"],
  ["May 7, 2025", "Field 5", "6:20 AM", "2.2 hrs", "2.9 m³"],
];

function IrrigationHistory() {
  return (
    <div
      className="
        rounded-2xl border border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <h2 className="text-[14px] font-semibold">
        Irrigation History
      </h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[500px] text-left">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[9px] text-[var(--color-text-muted)]">
              <th className="pb-3">Date</th>
              <th className="pb-3">Field</th>
              <th className="pb-3">Start</th>
              <th className="pb-3">Duration</th>
              <th className="pb-3">Water Used</th>
            </tr>
          </thead>

          <tbody>
            {history.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[var(--color-border)] last:border-0"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`
                      py-3 text-[9px]
                      ${
                        cellIndex === 1
                          ? "font-semibold"
                          : ""
                      }
                    `}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="mt-4 text-[10px] font-semibold text-[var(--color-primary)]">
        View Full Irrigation History →
      </button>
    </div>
  );
}

export default IrrigationHistory;