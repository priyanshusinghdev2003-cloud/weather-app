import { getDayNight } from "@/utility/utilityfunction";
import { Cloud, Moon, Sun, WindArrowDown } from "lucide-react";
import React from "react";

const filterData = (arr: any[], skip: number) => {
  if (skip === 0) return arr;
  return arr.filter((_, i) => i % skip === 0);
};

function TodayWeather({ todayHourlyWeather }: { todayHourlyWeather: any }) {
  const [skipCount, setSkipCount] = React.useState(1);

  React.useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 1024) setSkipCount(0);
      else if (window.innerWidth >= 768) setSkipCount(2);
      else setSkipCount(3);
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const filteredTime = filterData(todayHourlyWeather.time, skipCount);
  const filteredTemp = filterData(todayHourlyWeather.temperature, skipCount);
  const filteredWind = filterData(todayHourlyWeather.windspeed, skipCount);

  if (filteredTime.length === 0) return null;

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
