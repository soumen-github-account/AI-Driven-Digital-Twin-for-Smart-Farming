import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import FarmOverviewMap from "../components/dashboard/FarmOverviewMap";
import RecentAlerts from "../components/dashboard/RecentAlerts";
import CropHealthChart from "../components/dashboard/CropHealthChart";
import WaterUsageChart from "../components/dashboard/WaterUsageChart";
import YieldPredictionChart from "../components/dashboard/YieldPredictionChart";
import AIRecommendation from "../components/dashboard/AIRecommendation";
import QuickOverview from "../components/dashboard/QuickOverview";

import {
  Activity,
  Droplets,
  HeartPulse,
  LayoutGrid,
  Leaf,
  Wheat,
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Farm Health",
      value: "85%",
      subtitle: "Healthy",
      icon: HeartPulse,
      type: "success",
      trend: "6%",
      trendText: "vs last week",
      trendUp: true,
    },
    {
      title: "Active Fields",
      value: "12",
      subtitle: "of 18 fields",
      icon: Activity,
      type: "success",
      trend: "2",
      trendText: "vs last week",
      trendUp: true,
    },
    {
      title: "Total Area",
      value: "245.6",
      unit: "ha",
      subtitle: "Total Cultivated",
      icon: LayoutGrid,
      type: "success",
      trend: "No change",
      trendText: "",
      neutral: true,
    },
    {
      title: "Crop Health",
      value: "92%",
      subtitle: "Good",
      icon: Leaf,
      type: "success",
      trend: "8%",
      trendText: "vs last week",
      trendUp: true,
    },
    {
      title: "Water Usage",
      value: "62%",
      subtitle: "Efficient",
      icon: Droplets,
      type: "water",
      trend: "5%",
      trendText: "vs last week",
      trendUp: false,
    },
    {
      title: "Predicted Yield",
      value: "5.42",
      unit: "t/ha",
      subtitle: "Wheat",
      icon: Wheat,
      type: "warning",
      trend: "0.42",
      trendText: "vs last week",
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* HEADER */}
      <DashboardHeader />

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-3

          min-[480px]:grid-cols-2

          lg:grid-cols-3

          xl:grid-cols-6
        "
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </section>

      {/* =====================================================
          MAP + ALERTS
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-4

          xl:grid-cols-[minmax(0,2.1fr)_minmax(310px,1fr)]
        "
      >
        <FarmOverviewMap />

        <RecentAlerts />
      </section>

      {/* =====================================================
          CHARTS + AI
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-4

          xl:grid-cols-[minmax(0,1fr)_minmax(300px,0.82fr)]
        "
      >
        {/* Charts */}

        <div
          className="
            grid
            grid-cols-1
            gap-4

            md:grid-cols-2

            xl:grid-cols-3
          "
        >
          <CropHealthChart />

          <WaterUsageChart />

          <YieldPredictionChart />
        </div>

        {/* AI */}

        <AIRecommendation />
      </section>

      {/* =====================================================
          QUICK OVERVIEW
      ===================================================== */}

      <QuickOverview />

    </div>
  );
}

export default Dashboard;