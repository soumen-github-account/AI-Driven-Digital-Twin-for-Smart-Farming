const fields = [
  ["Field 1", "12.5", "Rice (Paddy)", "Tillering", "4.2", "87%", "₹2,15,000", "82%", "10,500", "12%", "92"],
  ["Field 2", "10.0", "Rice (Paddy)", "Tillering", "3.8", "83%", "₹1,82,000", "79%", "9,800", "18%", "86"],
  ["Field 3", "8.0", "Rice (Paddy)", "Tillering", "4.5", "89%", "₹1,62,000", "84%", "8,900", "10%", "94"],
  ["Field 4", "6.5", "Rice (Paddy)", "Tillering", "3.6", "80%", "₹1,28,000", "76%", "7,600", "22%", "78"],
  ["Field 5", "7.0", "Rice (Paddy)", "Tillering", "4.0", "85%", "₹1,75,000", "81%", "8,700", "14%", "89"],
];

const headers = [
  "Field",
  "Area",
  "Crop",
  "Growth Stage",
  "Yield",
  "Confidence",
  "Revenue",
  "Confidence",
  "Water",
  "Disease",
  "Health",
];

function FieldComparison() {
  return (
    <div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[13px] font-bold">
          Field Comparison
        </h3>

        <span className="text-[8px] text-[var(--color-text-muted)]">
          All fields
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">

          <thead>
            <tr className="border-b border-[var(--color-border)]">
              {headers.map((header) => (
                <th
                  key={header}
                  className="
                    px-2 py-2
                    text-left
                    text-[8px]
                    font-semibold
                    text-[var(--color-text-secondary)]
                  "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {fields.map((field, index) => (
              <tr
                key={index}
                className="
                  border-b border-[var(--color-border)]/70
                  last:border-0
                  hover:bg-[var(--color-primary)]/3
                "
              >
                {field.map((value, i) => (
                  <td
                    key={i}
                    className="
                      px-2 py-2.5
                      text-[8px]
                      font-medium
                      whitespace-nowrap
                    "
                  >
                    {i === 5 || i === 7 ? (
                      <span className="rounded-full bg-[var(--color-primary)]/10 px-2 py-1 font-bold text-[var(--color-primary)]">
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <button className="mt-3 text-[9px] font-semibold text-[var(--color-primary)]">
        View All Fields Analytics →
      </button>

    </div>
  );
}

export default FieldComparison;