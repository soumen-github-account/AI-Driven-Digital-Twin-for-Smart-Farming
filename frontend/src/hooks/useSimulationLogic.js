import { useEffect, useRef } from 'react';
import useSimulationStore from '../store/simulationStore';
import useFarmStore from '../store/farmStore';
import {
  calculateDiurnalAirTemp,
  calculateDiurnalHumidity,
  calculateETRate,
  updateSoilMoisture,
} from '../simulation/simulationEngine';

export default function useSimulationLogic() {
  const { simulationTime, isRunning } = useSimulationStore();
  const { sensors, updateSensorValue } = useFarmStore();
  const prevTimeRef = useRef(simulationTime);

  useEffect(() => {
    const timeDiff = simulationTime - prevTimeRef.current;
    if (timeDiff <= 0) {
      prevTimeRef.current = simulationTime;
      return;
    }

    const elapsedHours = timeDiff / 3600000;
    const currentAirTemp = calculateDiurnalAirTemp(simulationTime, 14, 28);
    const currentHumidity = calculateDiurnalHumidity(currentAirTemp);
    const etRate = calculateETRate(currentAirTemp, currentHumidity);

    // Diurnal solar PAR calculation
    const date = new Date(simulationTime);
    const hour = date.getHours() + date.getMinutes() / 60;
    let solarPAR = 0;
    if (hour >= 6 && hour <= 19) {
      const solarPhase = ((hour - 6) / 13) * Math.PI;
      solarPAR = Math.round(Math.sin(solarPhase) * 1150);
    }

    // Update each sensor according to physical simulation rules
    sensors.forEach((sensor) => {
      let nextValue = sensor.value;

      if (sensor.type === 'air-temp') {
        nextValue = currentAirTemp;
      } else if (sensor.type === 'soil-temperature') {
        // Soil temperature lags ~2 hours behind air and has reduced amplitude (16-24°C)
        const laggedTime = simulationTime - 2 * 3600000;
        nextValue = calculateDiurnalAirTemp(laggedTime, 16, 24);
      } else if (sensor.type === 'air-humidity') {
        nextValue = currentHumidity;
      } else if (sensor.type === 'light-intensity') {
        nextValue = solarPAR;
      } else if (sensor.type === 'soil-moisture') {
        // Continuous soil depletion via evapotranspiration
        nextValue = updateSoilMoisture(sensor.value, etRate, 0, elapsedHours);
      } else if (sensor.type === 'electrical-conductivity') {
        // Slight concentration variation inversely proportional to moisture
        const targetEC = 1.45 + (45 - sensor.value) * 0.008;
        nextValue = Number(Math.max(0.7, Math.min(2.5, targetEC)).toFixed(2));
      }

      if (Math.abs(nextValue - sensor.value) > 0.05) {
        updateSensorValue(sensor.id, nextValue);
      }
    });

    prevTimeRef.current = simulationTime;
  }, [simulationTime, sensors, updateSensorValue]);
}
