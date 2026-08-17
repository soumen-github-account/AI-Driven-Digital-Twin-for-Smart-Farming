import IrrigationHeader from "../components/irrigation/IrrigationHeader";
import IrrigationStatCards from "../components/irrigation/IrrigationStatCards";
import IrrigationStatusMap from "../components/irrigation/IrrigationStatusMap";
import SoilMoistureTrend from "../components/irrigation/SoilMoistureTrend";
import AIRRecommendation from "../components/irrigation/AIRRecommendation";
import WaterConsumption from "../components/irrigation/WaterConsumption";
import IrrigationHistory from "../components/irrigation/IrrigationHistory";
import FieldIrrigationSummary from "../components/irrigation/FieldIrrigationSummary";
import RainfallForecast from "../components/irrigation/RainfallForecast";

function IrrigationPage() {
  return (
    <div className="min-h-full bg-[var(--color-background)] p-4 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[1600px] space-y-5">

        {/* Header */}
        <IrrigationHeader />

        {/* Top Statistics */}
        <IrrigationStatCards />

        {/* Main analytics row */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.25fr_1.25fr_0.72fr]">

          <IrrigationStatusMap />

          <SoilMoistureTrend />

          <AIRRecommendation />

        </div>

        {/* Water consumption + lower analytics */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-[0.75fr_1fr]">

          <WaterConsumption />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <IrrigationHistory />
            <FieldIrrigationSummary />
          </div>

        </div>

        {/* Bottom */}
        <RainfallForecast />

      </div>
    </div>
  );
}

export default IrrigationPage;