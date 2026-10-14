import { create } from 'zustand';
import { calculatePolygonArea, calculatePolygonPerimeter, generateFieldZones } from '../utils/geometry';

// Irregular realistic polygon in meters relative to origin
const defaultFieldBoundary = [
  [-110, -75],
  [125, -95],
  [145, 45],
  [85, 115],
  [-115, 95],
  [-145, 5],
];

// Generates comprehensive deterministic sensor network with 24-point history
const generateSensors = () => {
  const baseTime = new Date('2026-04-15T08:00:00').getTime();

  const makeHistory = (baseVal, variance, unit) => {
    const list = [];
    for (let i = 24; i >= 0; i--) {
      const t = baseTime - i * 3600000;
      const v = baseVal + Math.sin(i * 0.45) * variance;
      list.push({ time: t, value: Number(v.toFixed(1)) });
    }
    return list;
  };

  return [
    {
      id: 'S-SM1',
      name: 'West Furrow Soil Moisture',
      type: 'soil-moisture',
      position: [-60, 0, -25],
      value: 46.5,
      unit: '%',
      threshold: { min: 35, max: 70 },
      status: 'online',
      depth: '20 cm Root Zone',
      history: makeHistory(46.5, 4.2),
    },
    {
      id: 'S-ST1',
      name: 'Core Loam Soil Temperature',
      type: 'soil-temperature',
      position: [45, 0, 30],
      value: 19.8,
      unit: '°C',
      threshold: { min: 12, max: 32 },
      status: 'online',
      depth: '15 cm Depth',
      history: makeHistory(19.8, 3.1),
    },
    {
      id: 'S-SM2',
      name: 'East Knoll Soil Moisture',
      type: 'soil-moisture',
      position: [85, 0, -45],
      value: 29.4,
      unit: '%',
      threshold: { min: 35, max: 70 },
      status: 'warning', // Below min moisture threshold
      depth: '20 cm Root Zone',
      history: makeHistory(29.4, 3.5),
    },
    {
      id: 'S-AT1',
      name: 'Canopy Air Temperature',
      type: 'air-temp',
      position: [0, 0, 0],
      value: 24.5,
      unit: '°C',
      threshold: { min: 10, max: 36 },
      status: 'online',
      height: '2.0 m Weather Mast',
      history: makeHistory(24.5, 5.8),
    },
    {
      id: 'S-AH1',
      name: 'Atmospheric Relative Humidity',
      type: 'air-humidity',
      position: [-25, 0, 50],
      value: 58.2,
      unit: '%',
      threshold: { min: 30, max: 85 },
      status: 'online',
      height: '2.0 m Weather Mast',
      history: makeHistory(58.2, 8.5),
    },
    {
      id: 'S-PH1',
      name: 'Subsurface Soil pH Probe',
      type: 'soil-ph',
      position: [-85, 0, 40],
      value: 6.4,
      unit: 'pH',
      threshold: { min: 6.0, max: 7.2 },
      status: 'online',
      depth: '25 cm Depth',
      history: makeHistory(6.4, 0.15),
    },
    {
      id: 'S-LI1',
      name: 'Solar PAR Light Sensor',
      type: 'light-intensity',
      position: [30, 0, -65],
      value: 840,
      unit: 'µmol/m²s',
      threshold: { min: 150, max: 2000 },
      status: 'online',
      height: '2.5 m Mast Top',
      history: makeHistory(840, 320),
    },
    {
      id: 'S-EC1',
      name: 'Rootzone Electrical Conductivity',
      type: 'electrical-conductivity',
      position: [70, 0, 70],
      value: 1.48,
      unit: 'dS/m',
      threshold: { min: 0.8, max: 2.8 },
      status: 'online',
      depth: '20 cm Depth',
      history: makeHistory(1.48, 0.18),
    },
  ];
};

const initialSensors = generateSensors();
const initialZones = generateFieldZones(defaultFieldBoundary, 4, 3);
const initialArea = calculatePolygonArea(defaultFieldBoundary);
const initialPerimeter = calculatePolygonPerimeter(defaultFieldBoundary);

const useFarmStore = create((set, get) => ({
  farmName: 'Evergreen Agricultural Research Farm',
  farmLocation: 'Corn Belt Sector Alpha, Midwest',
  selectedFieldId: 'F1',
  fieldBoundary: defaultFieldBoundary,
  fieldArea: initialArea,
  fieldPerimeter: initialPerimeter,
  zones: initialZones,
  selectedZoneId: initialZones[0]?.id || null,

  cropType: 'Corn', // 'Corn', 'Wheat', 'Soybean'
  variety: 'Pioneer P1197AM High-Yield Hybrid',
  plantingDate: '2026-03-20',
  growthStage: 'V8 (Early Vegetative)',
  soilType: 'Silt Loam (Well-Drained)',
  irrigationMethod: 'Precision Drip & Lateral Emitter',

  sensors: initialSensors,
  selectedSensorId: initialSensors[0]?.id || null,

  // Layer visibility state
  layers: {
    plants: true,
    rows: true,
    boundary: true,
    soil: true,
    irrigation: true, // Now fully wired to 3D drip manifold
    sensors: true,
    grid: true,
    labels: true,
  },

  // Active spatial heatmap metric
  activeHeatmap: 'none', // 'none' | 'moisture' | 'temperature' | 'health' | 'yield'

  toggleLayer: (layerName) => set((state) => ({
    layers: { ...state.layers, [layerName]: !state.layers[layerName] },
  })),

  setActiveHeatmap: (heatmapType) => set({ activeHeatmap: heatmapType }),

  setSelectedSensorId: (id) => set({ selectedSensorId: id }),

  setSelectedZoneId: (id) => set({ selectedZoneId: id }),

  setCropType: (type) => set({ cropType: type }),

  updateSensorThreshold: (id, newThreshold) => set((state) => ({
    sensors: state.sensors.map((s) => {
      if (s.id !== id) return s;
      const th = { ...s.threshold, ...newThreshold };
      let status = 'online';
      if (th.min !== undefined && s.value < th.min) status = 'warning';
      if (th.max !== undefined && s.value > th.max) status = 'warning';
      return { ...s, threshold: th, status };
    }),
  })),

  updateSensorValue: (id, newValue) => set((state) => ({
    sensors: state.sensors.map((s) => {
      if (s.id !== id) return s;
      let status = s.status;
      if (s.threshold) {
        status = 'online';
        if (s.threshold.min !== undefined && newValue < s.threshold.min) status = 'warning';
        if (s.threshold.max !== undefined && newValue > s.threshold.max) status = 'warning';
      }
      return { ...s, value: Number(newValue.toFixed(2)), status };
    }),
  })),

  applyIrrigationToField: (targetMoisturePct = 60, boostMm = 15) => {
    const { sensors } = get();
    // Update all soil moisture sensors
    sensors.forEach((s) => {
      if (s.type === 'soil-moisture') {
        const gain = boostMm * 0.65;
        const target = Math.min(targetMoisturePct, s.value + gain);
        get().updateSensorValue(s.id, target);
      }
    });
  },

  resetDemoData: () => set({
    sensors: generateSensors(),
    fieldBoundary: defaultFieldBoundary,
    fieldArea: calculatePolygonArea(defaultFieldBoundary),
    fieldPerimeter: calculatePolygonPerimeter(defaultFieldBoundary),
    cropType: 'Corn',
    activeHeatmap: 'none',
  }),
}));

export default useFarmStore;
