const fields = [
  {
    field: "Field 1",
    moisture: "28%",
    status: "Optimal",
    last: "May 11, 6:00 AM",
    next: "May 15, 6:00 AM",
  },
  {
    field: "Field 2",
    moisture: "32%",
    status: "Low Moisture",
    last: "May 8, 6:00 AM",
    next: "May 14, 6:00 AM",
  },
  {
    field: "Field 3",
    moisture: "45%",
    status: "Irrigating",
    last: "May 12, 6:10 AM",
    next: "May 16, 6:00 AM",
  },
  {
    field: "Field 4",
    moisture: "30%",
    status: "Optimal",
    last: "May 10, 6:15 AM",
    next: "May 15, 6:00 AM",
  },
  {
    field: "Field 5",
    moisture: "18%",
    status: "Very Low",
    last: "May 7, 6:20 AM",
    next: "May 14, 6:00 AM",
  },
];

function FieldIrrigationSummary() {
  return (
    <div
      className="
        rounded-2xl border border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        shadow-[0_4px_18px_rgba(0,0,0,0.035)]
      "
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-semibold">
          Field Irrigation Summary
        </h2>
      </div>

      <div className="mt-4 space-y-3">
        {fields.map((field) => (
          <div
            key={field.field}
            className="
              rounded-xl
              bg-[var(--color-surface-secondary)]
              p-3
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold">
                {field.field}
              </span>

              <span
                className={`
                  rounded-full px-2 py-1 text-[8px] font-semibold
                  ${
                    field.status === "Optimal"
                      ? "bg-green-100 text-green-700"
                      : field.status === "Very Low"
                        ? "bg-red-100 text-red-600"
                        : field.status === "Irrigating"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {field.status}
              </span>
            </div>

            <div className="mt-2 flex justify-between text-[8px] text-[var(--color-text-muted)]">
              <span>Moisture</span>
              <span className="font-semibold text-[var(--color-text-primary)]">
                {field.moisture}
              </span>
            </div>

            <div className="mt-1 flex justify-between text-[8px] text-[var(--color-text-muted)]">
              <span>Next irrigation</span>
              <span>{field.next}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 text-[10px] font-semibold text-[var(--color-primary)]">
        Manage All Fields →
      </button>
    </div>
  );
}

export default FieldIrrigationSummary;