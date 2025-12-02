"use client";
import FiveDayForeCast from "@/components/FiveDayForeCast";
import TemperatureCard from "@/components/TemperatureCard";
import { useWeatherStore } from "@/store/weather";
import {
  formatDay,
  formateTime,
  formateTimeShort,
  formatShortDate,
  getCloudStatus,
  getEvery3Hours,
} from "@/utility/utilityfunction";
import { useEffect } from "react";
import { motion } from "framer-motion";
import WeatherInfo from "@/components/WeatherInfo";
import TodayWeather from "@/components/TodayWeather";

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

  const futureWeather = {
    temperatureMax: weatherData?.daily.temperature_2m_max,
    temperatureMin: weatherData?.daily.temperature_2m_min,
    time: weatherData?.daily.time,
  };
  const foreCastData = {
    temperatureMax: weatherData?.daily.temperature_2m_max?.slice(1),
    temperatureMin: weatherData?.daily.temperature_2m_min?.slice(1),
    time: weatherData?.daily.time?.slice(1),
  };

  const todayHourlyWeather = {
    temperature: getEvery3Hours(weatherData?.hourly.temperature_2m || []),
    time: getEvery3Hours(weatherData?.hourly.time || [])?.map((time) =>
      formateTimeShort(time)
    ),
    windspeed: getEvery3Hours(weatherData?.hourly.wind_speed_10m || []),
  };
  useEffect(() => {
    getWeatherDataBasesOnLatAndLong(38.89511, -77.03637);
  }, []);
  console.log(todayHourlyWeather);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col lg:flex-row gap-4 items-center h-screen mt-5"
    >
      <div className="flex flex-col md:flex-row lg:flex-col gap-2 lg:w-[25%] flex-1/5 w-full">
        <TemperatureCard
          temperature={weatherDataInfo.temperature}
          temperatureUnit={weatherDataInfo.temperatureUnit}
          day={weatherDataInfo.day}
          date={weatherDataInfo.date}
          city={weatherDataInfo.city}
          country={weatherDataInfo.country}
          cloudStatus={weatherDataInfo.cloudStatus}
        />
        <h2 className="text-white text-lg hidden lg:block font-semibold">
          5 Day Forecast
        </h2>
        <FiveDayForeCast foreCastData={foreCastData} />
      </div>
      <div className="lg:flex-3/5 px-2 md:pl-5 gap-3 w-full">
        <WeatherInfo
          airQuality={weatherDataInfo?.airQuality}
          sunrise={weatherDataInfo?.sunrise}
          sunset={weatherDataInfo?.sunset}
          humidity={weatherDataInfo?.humidity}
          pressure={weatherDataInfo?.pressure}
          visibility={weatherDataInfo?.visibility}
          feelsLike={weatherDataInfo?.feelsLike}
        />
        <TodayWeather todayHourlyWeather={todayHourlyWeather} />
      </div>
    </motion.div>
  );
}

export default page;
