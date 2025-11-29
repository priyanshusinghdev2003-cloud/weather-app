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

export { getCloudStatus, getAirQualityStatus, formatDay, formatShortDate };
