import { useMemo, useState } from "react";

import AlertSummary from "../components/alerts/AlertSummary";
import AlertCard from "../components/alerts/AlertCard";
import RiskOverview from "../components/alerts/RiskOverview";
import RiskHeatmap from "../components/alerts/RiskHeatmap";
import RiskTrend from "../components/alerts/RiskTrend";
import ActiveFarmCard from "../components/alerts/ActiveFarmCard";
import QuickStats from "../components/alerts/QuickStats";

import { alertSummary, alerts } from "../assets/data/alertData";

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredAlerts = useMemo(() => {
    if (activeTab === "all") {
      return alerts;
    }

    return alerts.filter(
      (alert) => alert.type === activeTab
    );
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#f7f9f8] text-slate-900 dark:bg-[#06110e] dark:text-white">
      <main className="mx-auto max-w-[1800px] px-5 py-6">

        {/* Page Header */}
        <section className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/30">
                <span className="text-xl">⚠</span>
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Alerts & Risk Center
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Real-time alerts, risks and actionable
                  insights for your farm.
                </p>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04]">
            🔔 Alert Settings
          </button>
        </section>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">

          {/* LEFT */}
          <div className="min-w-0">

            {/* Summary */}
            <div className="mb-5">
              <AlertSummary
                items={alertSummary}
                active={activeTab}
                onChange={setActiveTab}
              />
            </div>

            {/* Filters */}
            <div className="mb-5 flex flex-wrap justify-end gap-2">
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                ⚱ Filter
              </button>

              <select className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none dark:border-white/10 dark:bg-white/[0.04]">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Highest Risk</option>
              </select>
            </div>

            {/* Alert Cards */}
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                />
              ))}
            </div>

            {/* Load More */}
            <button className="mt-4 flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]">
              Load More Alerts ↓
            </button>

            {/* Trend */}
            <div className="mt-5">
              <RiskTrend />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5">

            <RiskOverview />

            <RiskHeatmap />

            <ActiveFarmCard />

            <QuickStats />

          </aside>
        </div>
      </main>
    </div>
  );
}