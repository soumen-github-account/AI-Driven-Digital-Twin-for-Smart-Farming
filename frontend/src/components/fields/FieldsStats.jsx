import {
  Activity,
  Droplets,
  Sprout,
  Waves,
} from "lucide-react";

import MiniStat from "./MiniStat";

export default function FieldsStats() {
  return (
    <section
      className="
        mt-[24px]
        grid
        grid-cols-2
        gap-[12px]
        lg:grid-cols-4
      "
    >
      <MiniStat
        icon={Sprout}
        title="Total Fields"
        value="6"
        subtitle="Across 3 farms"
      />

      <MiniStat
        icon={Activity}
        title="Avg. Crop Health"
        value="84%"
        subtitle="+4.2% this week"
        positive
      />

      <MiniStat
        icon={Droplets}
        title="Avg. Soil Moisture"
        value="66%"
        subtitle="Optimal range"
        positive
      />

      <MiniStat
        icon={Waves}
        title="Need Attention"
        value="2"
        subtitle="Irrigation required"
        warning
      />
    </section>
  );
}