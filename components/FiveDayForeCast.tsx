import { formatDay, formatShortDate } from "@/utility/utilityfunction";

function FiveDayForeCast({ foreCastData }: any) {
  return (
    <div className="bg-[#111] rounded-xl p-5 shadow-lg border border-white/5 w-full flex flex-col gap-2">
      {foreCastData?.temperatureMin?.map((item: any, index: number) => (
        <div key={index} className="flex items-center justify-between py-1">
          {/* Temperature */}
          <div className="text-lg font-semibold text-white min-w-[50px]">
            {item}&deg;
          </div>

          {/* Date */}
          <div className="text-sm text-gray-400 min-w-[70px] text-center">
            {formatShortDate(foreCastData?.time[index])}
          </div>

          {/* Day */}
          <div className="text-sm text-gray-400 min-w-[80px] text-right">
            {formatDay(foreCastData?.time[index])}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FiveDayForeCast;
