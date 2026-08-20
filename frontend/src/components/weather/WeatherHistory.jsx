function WeatherHistory() {
  const history = [
    ["May 12, 2025", "31°C", "21°C", "0.0 mm", "10 km/h", "62%"],
    ["May 11, 2025", "30°C", "20°C", "1.2 mm", "8 km/h", "68%"],
    ["May 10, 2025", "29°C", "21°C", "5.6 mm", "12 km/h", "72%"],
  ];

  return (
    <div
      className="
        overflow-hidden
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
      "
    >
      <h2 className="text-[13px] font-bold">
        Recent Weather History
      </h2>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[450px] text-left">

          <thead>
            <tr className="border-b border-[var(--color-border)]">
              {[
                "Date",
                "Max Temp",
                "Min Temp",
                "Rainfall",
                "Wind Speed",
                "Humidity",
              ].map((heading) => (
                <th
                  key={heading}
                  className="
                    px-2
                    py-2
                    text-[8px]
                    font-semibold
                    text-[var(--color-text-muted)]
                  "
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {history.map((row) => (
              <tr
                key={row[0]}
                className="border-b border-[var(--color-border)] last:border-0"
              >
                {row.map((value, index) => (
                  <td
                    key={index}
                    className="
                      px-2
                      py-2.5
                      text-[9px]
                      font-medium
                    "
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default WeatherHistory;