import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return new Response(
      JSON.stringify({ error: "City name or coordinates (lat, lon) required" }),
      {
        status: 400,
      }
    );
  }

  let weatherUrl: string;
  let aqiUrl: string;
  aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone,carbon_monoxide&timezone=auto
`;

  weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,pressure_msl,visibility,wind_speed_10m,cloud_cover&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&forecast_days=5&timezone=auto

`;

  try {
    const weatherResponse = await fetch(weatherUrl);
    const aqiResponse = await fetch(aqiUrl);

    if (!weatherResponse.ok) {
      const weatherError = weatherResponse.ok
        ? null
        : await weatherResponse.json();
      return new Response(
        JSON.stringify({
          error: "Failed to fetch weather data",
          details: { weatherError },
        }),
        { status: weatherResponse.status || 500 }
      );
    }

    const weatherData = await weatherResponse.json();
    const aqiData = await aqiResponse.json();

    return new Response(JSON.stringify({ weatherData, aqiData }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
