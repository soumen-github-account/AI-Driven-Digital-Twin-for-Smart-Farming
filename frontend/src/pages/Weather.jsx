import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  ThermometerSun,
  Sprout,
  AlertTriangle,
  RefreshCw,
  Settings2,
} from "lucide-react";

import WeatherHeader from "../components/weather/WeatherHeader";
import CurrentWeather from "../components/weather/CurrentWeather";
import Forecast from "../components/weather/Forecast";
import WeatherChart from "../components/weather/WeatherChart";
import WeatherAlerts from "../components/weather/WeatherAlerts";
import SunriseSunset from "../components/weather/SunriseSunset";
import AgriculturalImpact from "../components/weather/AgriculturalImpact";
import WeatherHistory from "../components/weather/WeatherHistory";
import AIWeatherInsight from "../components/weather/AIWeatherInsight";
import DataSources from "../components/weather/DataSources";

const forecastData = [
  {
    day: "Tue",
    date: "May 13",
    icon: Sun,
    temp: 30,
    low: 22,
    rain: 20,
  },
  {
    day: "Wed",
    date: "May 14",
    icon: CloudRain,
    temp: 28,
    low: 21,
    rain: 80,
  },
  {
    day: "Thu",
    date: "May 15",
    icon: CloudRain,
    temp: 27,
    low: 21,
    rain: 90,
  },
  {
    day: "Fri",
    date: "May 16",
    icon: CloudSun,
    temp: 31,
    low: 22,
    rain: 30,
  },
  {
    day: "Sat",
    date: "May 17",
    icon: Sun,
    temp: 32,
    low: 23,
    rain: 10,
  },
  {
    day: "Sun",
    date: "May 18",
    icon: Sun,
    temp: 33,
    low: 23,
    rain: 20,
  },
  {
    day: "Mon",
    date: "May 19",
    icon: CloudRain,
    temp: 28,
    low: 20,
    rain: 60,
  },
];

const temperatureData = [
  { day: "May 7", max: 32, min: 23 },
  { day: "May 8", max: 30, min: 22 },
  { day: "May 9", max: 31, min: 23 },
  { day: "May 10", max: 29, min: 22 },
  { day: "May 11", max: 31, min: 22 },
  { day: "May 12", max: 30, min: 20 },
  { day: "May 13", max: 29, min: 20 },
];

const rainfallData = [
  { day: "May 13", rainfall: 2.4 },
  { day: "May 14", rainfall: 18.6 },
  { day: "May 15", rainfall: 32.8 },
  { day: "May 16", rainfall: 12.5 },
  { day: "May 17", rainfall: 3.2 },
  { day: "May 18", rainfall: 1 },
  { day: "May 19", rainfall: 8.4 },
];

const humidityData = [
  { day: "May 7", value: 58 },
  { day: "May 8", value: 72 },
  { day: "May 9", value: 74 },
  { day: "May 10", value: 62 },
  { day: "May 11", value: 55 },
  { day: "May 12", value: 58 },
  { day: "May 13", value: 65 },
];

const windData = [
  { day: "May 7", value: 13 },
  { day: "May 8", value: 16 },
  { day: "May 9", value: 15 },
  { day: "May 10", value: 11 },
  { day: "May 11", value: 21 },
  { day: "May 12", value: 14 },
  { day: "May 13", value: 12 },
];

const solarData = [
  { day: "May 7", value: 18 },
  { day: "May 8", value: 21 },
  { day: "May 9", value: 17 },
  { day: "May 10", value: 19 },
  { day: "May 11", value: 23 },
  { day: "May 12", value: 20 },
  { day: "May 13", value: 18.6 },
];

function Weather() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <main className="p-4 md:p-5 lg:p-6">

        {/* HEADER */}
        <WeatherHeader />

        {/* LOCATION */}
        <div className="mb-4 flex items-center gap-2 text-sm">
          <span className="text-[var(--color-primary)]">●</span>

          <span className="font-semibold">
            Green Valley Farm, West Bengal, India
          </span>

          <span className="text-[var(--color-text-muted)]">
            ⌄
          </span>
        </div>

        {/* CURRENT + FORECAST */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
          <CurrentWeather />

          <Forecast data={forecastData} />
        </section>

        {/* MAIN GRID */}
        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr_1fr_265px]">

          {/* Temperature */}
          <WeatherChart
            title="Temperature Trend"
            subtitle="°C"
            data={temperatureData}
            lines={[
              {
                key: "max",
                label: "Max Temp",
              },
              {
                key: "min",
                label: "Min Temp",
              },
            ]}
            type="line"
          />

          {/* Rainfall */}
          <WeatherChart
            title="Rainfall Forecast"
            subtitle="mm"
            data={rainfallData}
            bars={[
              {
                key: "rainfall",
                label: "Expected Rainfall",
              },
            ]}
            type="bar"
          />

          {/* Humidity */}
          <WeatherChart
            title="Humidity"
            subtitle="%"
            data={humidityData}
            lines={[
              {
                key: "value",
                label: "Humidity (%)",
              },
            ]}
            type="line"
          />

          <WeatherAlerts />
        </section>

        {/* SECOND ROW */}
        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr_1fr_265px]">

          <WeatherChart
            title="Wind Speed"
            subtitle="km/h"
            data={windData}
            lines={[
              {
                key: "value",
                label: "Wind Speed (km/h)",
              },
            ]}
            type="line"
          />

          <WeatherChart
            title="Solar Radiation"
            subtitle="MJ/m²"
            data={solarData}
            lines={[
              {
                key: "value",
                label: "Solar Radiation",
              },
            ]}
            type="line"
          />

          <SunriseSunset />

          <AIWeatherInsight />
        </section>

        {/* BOTTOM */}
        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr_265px]">

          <AgriculturalImpact />

          <WeatherHistory />

          <DataSources />

        </section>
      </main>
    </div>
  );
}

export default Weather;