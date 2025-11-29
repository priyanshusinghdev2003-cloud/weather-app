"use client";
import TemperatureCard from "@/components/TemperatureCard";
import { useWeatherStore } from "@/store/weather";
import {
  formatDay,
  formatShortDate,
  getCloudStatus,
} from "@/utility/utilityfunction";
import { useEffect } from "react";

function page() {
  const { getWeatherDataBasesOnLatAndLong, weatherData, airData, location } =
    useWeatherStore();

  const weatherDataInfo = {
    city: location?.name,
    country: location?.country_code,
    fullLocation: `${location?.name}, ${location?.country_code}`,

    temperature: weatherData?.current_weather.temperature,
    temperatureUnit: weatherData?.current_weather_units?.temperature,
    windSpeed: weatherData?.current_weather.windspeed,
    feelsLike: weatherData?.hourly.apparent_temperature[0],
    humidity: weatherData?.hourly.relative_humidity_2m[0],
    pressure: weatherData?.hourly.pressure_msl[0],
    visibility: weatherData?.hourly.visibility[0],
    cloudPercent: weatherData?.hourly.cloud_cover[0],
    cloudStatus: getCloudStatus(weatherData?.hourly.cloud_cover[0]),

    day: formatDay(weatherData?.current_weather.time),
    date: formatShortDate(weatherData?.current_weather.time),

    sunrise: weatherData?.daily.sunrise[0],
    sunset: weatherData?.daily.sunset[0],

    airQuality: {
      pm25: airData?.hourly.pm2_5?.[0],
      pm10: airData?.hourly.pm10?.[0],
      no2: airData?.hourly.nitrogen_dioxide?.[0],
      so2: airData?.hourly.sulphur_dioxide?.[0],
      o3: airData?.hourly.ozone?.[0],
    },
  };
  console.log(weatherData);
  const futureWeather = {
    temperatureMax: weatherData?.daily.temperature_2m_max,
    temperatureMin: weatherData?.daily.temperature_2m_min,
    time: weatherData?.daily.time,
  };

  useEffect(() => {
    getWeatherDataBasesOnLatAndLong(38.89511, -77.03637);
  }, []);

  return (
    <div className="flex gap-4 items-center  h-screen mt-5">
      <div className="flex flex-col items-center gap-4">
        <TemperatureCard
          temperature={weatherDataInfo.temperature}
          temperatureUnit={weatherDataInfo.temperatureUnit}
          day={weatherDataInfo.day}
          date={weatherDataInfo.date}
          city={weatherDataInfo.city}
          country={weatherDataInfo.country}
          cloudStatus={weatherDataInfo.cloudStatus}
        />
      </div>
    </div>
  );
}

export default page;
