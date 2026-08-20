export const alertSummary = [
  {
    label: "All Alerts",
    count: 24,
    type: "all",
  },
  {
    label: "Critical",
    count: 3,
    type: "critical",
  },
  {
    label: "Warning",
    count: 7,
    type: "warning",
  },
  {
    label: "Information",
    count: 10,
    type: "info",
  },
  {
    label: "Resolved",
    count: 12,
    type: "resolved",
  },
];

export const alerts = [
  {
    id: 1,
    type: "critical",
    title: "Disease risk detected in Field 3",
    description:
      "High probability of Blast disease in Rice (Paddy). Favorable conditions detected for disease spread.",
    time: "Today, 10:24 AM",
    field: "Field 3 (8.0 ha)",
    crop: "Rice (Paddy)",
    risk: "Critical",
    condition: "High humidity (87%) + Temp (28°C) + Leaf wetness",
    recommendation:
      "Apply fungicide within 24 hours and improve air circulation.",
  },

  {
    id: 2,
    type: "warning",
    title: "Soil moisture below threshold",
    description:
      "Soil moisture is below optimal level in Field 2. Crop may experience water stress.",
    time: "Today, 09:45 AM",
    field: "Field 2 (10.0 ha)",
    crop: "Rice (Paddy)",
    risk: "Warning",
    condition: "Soil moisture: 18% (Threshold: 25%)",
    recommendation:
      "Schedule irrigation in the next 24–48 hours.",
  },

  {
    id: 3,
    type: "warning",
    title: "Heavy rainfall expected",
    description:
      "Heavy rainfall (60–80 mm) expected in your area within next 48 hours.",
    time: "Today, 08:30 AM",
    field: "All Fields",
    crop: "Weather",
    risk: "Warning",
    condition: "Rainfall: 60–80 mm | Wind: 20–25 km/h",
    recommendation:
      "Ensure proper drainage and postpone fertilizer application.",
  },

  {
    id: 4,
    type: "info",
    title: "Fertilizer application due",
    description:
      "Basal fertilizer application is due for Field 1. Optimal window: Next 3 days.",
    time: "Today, 07:15 AM",
    field: "Field 1 (12.5 ha)",
    crop: "Rice (Paddy)",
    risk: "Information",
    condition: "Crop age: 32 days | Stage: Tillering",
    recommendation:
      "Apply recommended fertilizer as per schedule.",
  },
];

export const riskData = [
  {
    name: "Disease Risk",
    value: 72,
    color: "#ef4444",
  },
  {
    name: "Water Stress",
    value: 48,
    color: "#f59e0b",
  },
  {
    name: "Weather Risk",
    value: 55,
    color: "#f59e0b",
  },
  {
    name: "Crop Stress",
    value: 28,
    color: "#16a34a",
  },
];

export const trendData = [
  {
    date: "May 12",
    disease: 65,
    water: 42,
    weather: 45,
    crop: 18,
  },
  {
    date: "May 13",
    disease: 78,
    water: 50,
    weather: 48,
    crop: 22,
  },
  {
    date: "May 14",
    disease: 80,
    water: 45,
    weather: 52,
    crop: 15,
  },
  {
    date: "May 15",
    disease: 75,
    water: 56,
    weather: 50,
    crop: 20,
  },
  {
    date: "May 16",
    disease: 82,
    water: 52,
    weather: 58,
    crop: 16,
  },
  {
    date: "May 17",
    disease: 74,
    water: 48,
    weather: 50,
    crop: 22,
  },
  {
    date: "May 18",
    disease: 78,
    water: 43,
    weather: 55,
    crop: 20,
  },
];