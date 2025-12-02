import { getDayNight } from "@/utility/utilityfunction";
import { Cloud, Moon, Sun, WindArrowDown } from "lucide-react";
import React from "react";

function TodayWeather({
  todayHourlyWeather,
}: {
  todayHourlyWeather: {
    temperature: number[];
    time: string[];
    windspeed: number[];
  };
}) {
  const [skipCount, setSkipCount] = React.useState(1);

  React.useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 1024) {
        setSkipCount(0);
      } else if (window.innerWidth >= 768) {
        setSkipCount(2);
      } else {
        setSkipCount(3);
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const filteredTime = todayHourlyWeather.time.filter(
    (_, i) => i % skipCount === 0
  );
  const filteredTemp = todayHourlyWeather.temperature.filter(
    (_, i) => i % skipCount === 0
  );
  const filteredWind = todayHourlyWeather.windspeed.filter(
    (_, i) => i % skipCount === 0
  );

  return (
    <div className="mt-3">
      <h2>Today at</h2>

      <div className="flex gap-3 justify-between px-3 py-1">
        {filteredTime.map((time, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="bg-[#111] rounded-xl p-2 px-4 flex items-center flex-col gap-1">
              <p className="text-white/40">{time}</p>

              {getDayNight(time) === "Day" ? (
                <Sun color="yellow" size={30} />
              ) : getDayNight(time) === "Night" ? (
                <Moon color="white" size={30} />
              ) : (
                <Cloud size={30} />
              )}

              <p className="text-sm">{filteredTemp[index]}°</p>
            </div>

            <div className="bg-[#111] rounded-xl p-2 px-4 flex items-center flex-col gap-1">
              <p className="text-white/40">{time}</p>
              <WindArrowDown size={30} />
              <p className="text-sm">{filteredWind[index]} km/h</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodayWeather;
