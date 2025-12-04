import {
  formateTime,
  getAirQualityStatus,
  meterToKilometer,
} from "@/utility/utilityfunction";
import {
  AirVent,
  Droplets,
  Eye,
  Moon,
  Sun,
  Thermometer,
  Waves,
  Wind,
} from "lucide-react";
import React from "react";

function WeatherInfo({
  airQuality,
  sunrise,
  sunset,
  humidity,
  pressure,
  visibility,
  feelsLike,
}: any) {
  return (
    <div className="bg-[#111] rounded-xl p-5 shadow-lg border border-white/5 w-full flex flex-col gap-3">
      <h2 className="text-white/70 text-md font-semibold mb-1">
        Today Highlights
      </h2>

      <div className="grid grid-cols-4 grid-rows-3 gap-3">
        <div className="bg-black -mt-20 md:mt-0 rounded-xl p-4 h-[120px] row-span-2 md:col-span-2 col-span-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-white/40">Air Quality Index</h2>
            <p
              className={`text-black rounded-2xl py-0.5 px-3 text-xs font-semibold ${
                getAirQualityStatus(airQuality?.pm25) === "Good"
                  ? "bg-green-500"
                  : getAirQualityStatus(airQuality?.pm25) === "Moderate"
                  ? "bg-yellow-500"
                  : getAirQualityStatus(airQuality?.pm25) === "Unhealthy"
                  ? "bg-red-500"
                  : "bg-gray-500"
              }`}
            >
              {getAirQualityStatus(airQuality?.pm25)}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <h2 className="text-white/40 text-xs">PM2.5</h2>
              <p className="text-xl font-semibold">{airQuality?.pm25}</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-white/40 text-xs">SO2</h2>
              <p className="text-xl font-semibold">{airQuality?.so2}</p>
            </div>
            <div className="flex flex-col items-center ">
              <h2 className="text-white/40 text-xs">NO2</h2>
              <p className="text-xl font-semibold">{airQuality?.no2}</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-white/40 text-xs">O3</h2>
              <p className="text-xl font-semibold">{airQuality?.o3}</p>
            </div>
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div className="bg-black rounded-xl p-4 flex flex-col h-[120px] md:col-start-3 col-start-1  md:col-span-2 col-span-4 row-span-2 row-start-2 lg:row-start-1">
          <h2 className="text-sm text-white/40 mb-4">Sunrise & Sunset</h2>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sun className="text-yellow-400" />
              <div className="flex flex-col items-center -mt-2">
                <h2 className="text-xs text-white/40">Sunrise</h2>
                <p className="text-xl font-semibold">{formateTime(sunrise)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Moon className="text-blue-300" />
              <div className="flex flex-col items-center -mt-2">
                <h2 className="text-xs text-white/40">Sunset</h2>
                <p className="lg:text-xl text-lg font-semibold">
                  {formateTime(sunset)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-black rounded-xl p-4 row-start-1 lg:row-start-3 col-start-3 lg:col-start-1">
          <h2 className="text-sm text-white/40 mb-1">Humidity</h2>
          <div className="flex items-center justify-between">
            <Droplets className="text-white/80" />
            <p className="text-xl font-semibold">{humidity}%</p>
          </div>
        </div>

        {/* Pressure */}
        <div className="bg-black rounded-xl p-4 lg:row-start-3 md:row-start-2 row-start-1">
          <h2 className="text-sm text-white/40 mb-1">Pressure</h2>
          <div className="flex items-center justify-between">
            <Waves className="text-white/80 hidden lg:block" />
            <p className="text-xl font-semibold">
              {pressure}
              <span className="text-sm text-white/40"> hPa</span>
            </p>
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-black rounded-xl p-4 lg:row-start-3 md:row-start-2 row-start-1">
          <h2 className="text-sm text-white/40 mb-1">Visibility</h2>
          <div className="flex items-center justify-between">
            <Eye className="text-white/80 hidden lg:block" />
            <p className="text-xl font-semibold">
              {meterToKilometer(visibility)}
              <span className="text-sm text-white/40"> km</span>
            </p>
          </div>
        </div>

        {/* Feels Like */}
        <div className="bg-black rounded-xl p-4 lg:row-start-3 row-start-1 col-start-4">
          <h2 className="text-sm text-white/40 mb-1">Feels Like</h2>
          <div className="flex items-center justify-between">
            <Thermometer className="text-white/80" />
            <p className="text-xl font-semibold">
              {feelsLike}
              <span className="text-sm text-white/40">°C</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
