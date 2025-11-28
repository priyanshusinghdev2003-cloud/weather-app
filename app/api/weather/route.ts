import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const q = searchParams.get("q");

  if (!q && (!lat || !lon)) {
    return new Response(JSON.stringify({ error: "City name or coordinates (lat, lon) required" }), {
      status: 400,
    });
  }

  const API_KEY = process.env.OPEN_WEATHER_KEY;
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: "OpenWeather API key not configured" }), {
      status: 500,
    });
  }

  let weatherUrl: string;
  let forecastUrl: string;

  if (q) {
    weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=imperial&appid=${API_KEY}`;
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&units=imperial&appid=${API_KEY}`;
  } else {
    weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
  }

  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl),
    ]);

    if (!weatherResponse.ok || !forecastResponse.ok) {
      const weatherError = weatherResponse.ok ? null : await weatherResponse.json();
      const forecastError = forecastResponse.ok ? null : await forecastResponse.json();
      return new Response(
        JSON.stringify({
          error: "Failed to fetch weather data",
          details: { weatherError, forecastError },
        }),
        { status: weatherResponse.status || forecastResponse.status || 500 }
      );
    }

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    return new Response(JSON.stringify({ weatherData, forecastData }), { status: 200 });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
