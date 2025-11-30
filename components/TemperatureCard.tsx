import Image from "next/image";
import { Calendar, LocationEdit } from "lucide-react";

function getCloudIcon(status: string) {
  if (!status) return "/weather/clear.png";

  const s = status.toLowerCase();

  if (s.includes("clear")) return "/weather/clear.png";
  if (s.includes("few")) return "/weather/few-clouds.png";
  if (s.includes("broken")) return "/weather/broken-clouds.png";
  if (s.includes("overcast")) return "/weather/overcast.png";

  return "/weather/clear.png";
}

function TemperatureCard({
  temperature,
  temperatureUnit,
  day,
  date,
  city,
  country,
  cloudStatus,
}: {
  temperature: number;
  temperatureUnit: string;
  day: string;
  date: string;
  city: string;
  country: string;
  cloudStatus: string;
}) {
  return (
    <div className="bg-[#111] rounded-xl p-5 pr-10 shadow-lg border border-white/5 w-full">
      {/* Header */}
      <h1 className="text-gray-300 text-lg mb-3">Now</h1>

      <div className="flex items-center justify-between">
        {/* Temperature Section */}
        <div className="flex flex-col items-start">
          <h1 className="text-white font-semibold text-5xl leading-tight">
            {temperature}
            <span className="text-2xl text-gray-400 ml-1">
              {temperatureUnit}
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">{cloudStatus}</p>
        </div>

        {/* Cloud Icon */}
        <Image
          src={getCloudIcon(cloudStatus)}
          width={80}
          height={80}
          alt="Weather Icon"
          className="drop-shadow-md"
        />
      </div>

      <hr className="border-white/10 my-4" />

      {/* Date & Location */}
      <div className="space-y-2">
        <p className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar size={16} />
          {day}, {date}
        </p>

        <p className="flex items-center gap-2 text-sm text-gray-400">
          <LocationEdit size={16} />
          {city}, {country}
        </p>
      </div>
    </div>
  );
}

export default TemperatureCard;
