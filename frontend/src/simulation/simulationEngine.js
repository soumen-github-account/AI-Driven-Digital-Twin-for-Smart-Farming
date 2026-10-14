/**
 * Deterministic Agricultural Simulation Engine
 * Prototype models for crop health, evapotranspiration, moisture, and microclimate.
 * NOTE: These are illustrative digital-twin simulation models, not certified agronomic forecasts.
 */

/**
 * Deterministic spatial hash function (returns 0.0 to 1.0)
 * Replaces Math.random() with a reproducible, seedable coordinate hash.
 */
export function pseudoNoise2D(x, z, seed = 42) {
  const n = Math.sin(x * 12.9898 + z * 78.233 + seed * 37.719) * 43758.5453123;
  return n - Math.floor(n);
}

/**
 * Smooth 2D spatial variation using 4-point bilinear interpolation of pseudo-noise.
 */
export function smoothSpatialNoise(x, z, scale = 40, seed = 42) {
  const sx = x / scale;
  const sz = z / scale;
  const x0 = Math.floor(sx);
  const z0 = Math.floor(sz);
  const x1 = x0 + 1;
  const z1 = z0 + 1;

  const fx = sx - x0;
  const fz = sz - z0;
  // Smoothstep
  const wx = fx * fx * (3 - 2 * fx);
  const wz = fz * fz * (3 - 2 * fz);

  const n00 = pseudoNoise2D(x0, z0, seed);
  const n10 = pseudoNoise2D(x1, z0, seed);
  const n01 = pseudoNoise2D(x0, z1, seed);
  const n11 = pseudoNoise2D(x1, z1, seed);

  const nx0 = n00 * (1 - wx) + n10 * wx;
  const nx1 = n01 * (1 - wx) + n11 * wx;
  return nx0 * (1 - wz) + nx1 * wz;
}

/**
 * Simulates the diurnal air temperature curve for a given timestamp.
 * Peak occurs at ~14:30, minimum at ~05:30.
 * @param {number} timestamp - Unix epoch in ms
 * @param {number} baseMin - Minimum morning temperature (°C)
 * @param {number} baseMax - Maximum afternoon temperature (°C)
 * @returns {number} Temperature in °C
 */
export function calculateDiurnalAirTemp(timestamp, baseMin = 14, baseMax = 28) {
  const date = new Date(timestamp);
  const decimalHours = date.getHours() + date.getMinutes() / 60;
  const amplitude = baseMax - baseMin;
  let norm = 0;
  if (decimalHours >= 5.5 && decimalHours <= 14.5) {
    // Daytime warming from sunrise (05:30) to peak (14:30)
    const p = ((decimalHours - 5.5) / 9) * (Math.PI / 2);
    norm = Math.sin(p);
  } else {
    // Afternoon and nighttime cooling from peak (14:30) to sunrise (05:30)
    const hoursPastPeak = decimalHours > 14.5 ? decimalHours - 14.5 : decimalHours + 24 - 14.5;
    const p = (hoursPastPeak / 15) * (Math.PI / 2);
    norm = Math.cos(p);
  }
  return Number((baseMin + amplitude * norm).toFixed(1));
}

/**
 * Diurnal relative humidity (inverse of temperature).
 */
export function calculateDiurnalHumidity(airTemp, baseTemp = 21, baseHum = 65) {
  // Higher temp causes lower relative humidity
  const hum = baseHum - (airTemp - baseTemp) * 2.2;
  return Math.max(25, Math.min(95, Number(hum.toFixed(1))));
}

/**
 * Reference Evapotranspiration (ET0) estimation (mm / hour).
 * Approximated using temperature and humidity proxy.
 */
export function calculateETRate(airTemp, humidity) {
  const vaporPressureDeficit = Math.max(0.1, (100 - humidity) / 100) * 1.5;
  const tempFactor = Math.max(0, (airTemp - 8) / 20);
  const etMmPerHour = 0.15 * tempFactor * vaporPressureDeficit;
  return Number(Math.max(0.01, etMmPerHour).toFixed(4));
}

/**
 * Updates soil moisture after elapsed time.
 * @param {number} currentMoisture - in percent (0 - 100%)
 * @param {number} etRate - mm/hour
 * @param {number} irrigationMm - mm of water added
 * @param {number} elapsedHours - simulated hours elapsed
 * @returns {number} Updated moisture in %
 */
export function updateSoilMoisture(currentMoisture, etRate, irrigationMm, elapsedHours) {
  // 1 mm water in typical loam root zone corresponds to ~0.65% volumetric moisture
  const moistureGain = irrigationMm * 0.65;
  // ET loss conversion
  const moistureLoss = etRate * 0.45 * elapsedHours;
  // Soil drainage when saturated above 50%
  const drainage = currentMoisture > 50 ? (currentMoisture - 50) * 0.05 * elapsedHours : 0;

  const newMoisture = currentMoisture + moistureGain - moistureLoss - drainage;
  return Math.max(8, Math.min(85, Number(newMoisture.toFixed(2))));
}

/**
 * Calculates water stress index (0 = optimal, 100 = extreme stress).
 * Ideal moisture range for corn/loam is 40% - 60%.
 */
export function calculateWaterStress(soilMoisture) {
  if (soilMoisture >= 40 && soilMoisture <= 65) {
    return 5; // Minimal stress
  }
  if (soilMoisture < 40) {
    // Under-watering stress
    const deficit = 40 - soilMoisture;
    return Math.min(100, Math.round(deficit * 3.1));
  }
  // Waterlogging stress
  const excess = soilMoisture - 65;
  return Math.min(100, Math.round(excess * 2.8));
}

/**
 * Calculates simulated NDVI (Crop Health Index) between 0.20 and 0.95.
 */
export function calculateNDVI(soilMoisture, airTemp, stressIndex, baselineHealth = 0.85) {
  // Stress penalty
  const stressPenalty = (stressIndex / 100) * 0.35;
  // Temperature stress penalty if temp is outside 18-30°C
  const tempDeviation = airTemp < 18 ? (18 - airTemp) * 0.015 : airTemp > 30 ? (airTemp - 30) * 0.02 : 0;
  
  const ndvi = baselineHealth - stressPenalty - tempDeviation;
  return Math.max(0.20, Math.min(0.95, Number(ndvi.toFixed(2))));
}

/**
 * Calculates illustrative yield potential in metric tonnes per hectare (t/ha).
 * Corn benchmark: 7.0 - 14.5 t/ha.
 */
export function calculateYieldPotential(ndvi, avgWaterStress, cropType = 'Corn') {
  const baseYield = cropType === 'Corn' ? 12.5 : cropType === 'Wheat' ? 7.2 : 4.5;
  const healthFactor = ndvi / 0.85;
  const stressFactor = 1 - (avgWaterStress / 100) * 0.45;
  const yieldEst = baseYield * healthFactor * stressFactor;
  return Math.max(1.5, Number(yieldEst.toFixed(2)));
}

/**
 * Evaluates spatial metric value at coordinate (x, z) deterministically.
 * @param {string} metric - 'moisture' | 'temperature' | 'health' | 'yield'
 * @param {number} x
 * @param {number} z
 * @param {Object} globalSimState
 * @returns {{ value: number, normalized: number, display: string, unit: string }}
 */
export function evaluateSpatialMetric(metric, x, z, globalSimState) {
  const { currentAirTemp = 22, avgSoilMoisture = 42, activeIrrigationZones = [] } = globalSimState;

  // Stable microtopography & soil variation
  const soilElevation = smoothSpatialNoise(x, z, 70, 101);
  const soilTextureNoise = smoothSpatialNoise(x, z, 35, 202);

  switch (metric) {
    case 'moisture': {
      // Depressions (low elevation) retain more moisture
      let localMoisture = avgSoilMoisture + (0.5 - soilElevation) * 12 + (soilTextureNoise - 0.5) * 8;
      // Bonus if near irrigation line or active zone
      if (activeIrrigationZones.length > 0) {
        localMoisture += 8;
      }
      localMoisture = Math.max(15, Math.min(75, localMoisture));
      // Normalized between 15% and 75%
      const norm = (localMoisture - 15) / (75 - 15);
      return {
        value: Number(localMoisture.toFixed(1)),
        normalized: Math.max(0, Math.min(1, norm)),
        display: `${localMoisture.toFixed(1)}%`,
        unit: '%',
      };
    }
    case 'temperature': {
      // High spots receive slightly more solar heating
      const localTemp = currentAirTemp + (soilElevation - 0.5) * 3.5 + (soilTextureNoise - 0.5) * 1.5;
      // Normalized between 14°C and 34°C
      const norm = (localTemp - 14) / (34 - 14);
      return {
        value: Number(localTemp.toFixed(1)),
        normalized: Math.max(0, Math.min(1, norm)),
        display: `${localTemp.toFixed(1)}°C`,
        unit: '°C',
      };
    }
    case 'health': {
      // Health derived from local moisture optimal distance
      const localMoisture = avgSoilMoisture + (0.5 - soilElevation) * 12;
      const stress = calculateWaterStress(localMoisture);
      const ndvi = calculateNDVI(localMoisture, currentAirTemp, stress, 0.84 + (soilTextureNoise - 0.5) * 0.1);
      // Normalized between 0.30 and 0.95
      const norm = (ndvi - 0.30) / (0.95 - 0.30);
      return {
        value: ndvi,
        normalized: Math.max(0, Math.min(1, norm)),
        display: `${ndvi.toFixed(2)} NDVI`,
        unit: 'NDVI',
      };
    }
    case 'yield': {
      const localMoisture = avgSoilMoisture + (0.5 - soilElevation) * 12;
      const stress = calculateWaterStress(localMoisture);
      const ndvi = calculateNDVI(localMoisture, currentAirTemp, stress, 0.84);
      const yieldPot = calculateYieldPotential(ndvi, stress, 'Corn');
      // Normalized between 6.0 and 15.0 t/ha
      const norm = (yieldPot - 6.0) / (15.0 - 6.0);
      return {
        value: yieldPot,
        normalized: Math.max(0, Math.min(1, norm)),
        display: `${yieldPot.toFixed(1)} t/ha`,
        unit: 't/ha',
      };
    }
    default:
      return { value: 0, normalized: 0, display: 'N/A', unit: '' };
  }
}
