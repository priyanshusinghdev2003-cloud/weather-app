import { isMobile } from "react-device-detect";

const getCloudStatus = (cloud: number) => {
  if (cloud < 20) return "Clear Sky";
  if (cloud < 50) return "Few Clouds";
  if (cloud < 90) return "Broken Clouds";
  return "Overcast";
};

const getAirQualityStatus = (pm25: number) => {
  if (pm25 <= 12) return "Good";
  if (pm25 <= 35) return "Moderate";
  return "Unhealthy";
};

const formatDay = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const formatShortDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
};

const formateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
const formateTimeShort = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
  });
};

const meterToKilometer = (meter: number) => {
  return meter / 1000;
};

const getEvery3Hours = (arr: any[]) => {
  if (!arr) return [];
  if (isMobile) return arr.slice(0, 12).filter((_, index) => index % 4 === 0);
  return arr.slice(0, 24).filter((_, index) => index % 3 === 0);
};

const getDayNight = (dateString: string) => {
  let day = ["9 AM", "12 PM", "3 PM"];
  let night = ["9 PM", "12 AM", "3 AM"];
  if (day.includes(dateString)) return "Day";
  if (night.includes(dateString)) return "Night";
  return "Evening";
};

export {
  getCloudStatus,
  getAirQualityStatus,
  formatDay,
  formatShortDate,
  formateTime,
  formateTimeShort,
  meterToKilometer,
  getEvery3Hours,
  getDayNight,
};
