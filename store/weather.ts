import { create } from "zustand";

interface WeatherStore {
  weatherData: any;
  airData: any;
  isLoading: boolean;
  location: {
    name: string;
    country_code: string;
  };
  getWeatherDataBasesOnLatAndLong: (lat: number, lon: number) => void;
  setLocation: ({
    name,
    country_code,
  }: {
    name: string;
    country_code: string;
  }) => void;
  getCityFromLatLon: ({ lat, lon }: { lat: number; lon: number }) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: <any>null,
  airData: <any>null,
  isLoading: false,
  location: {
    name: "Washington",
    country_code: "US",
  },

  getWeatherDataBasesOnLatAndLong: (lat: number, lon: number) => {
    set({ isLoading: true });
    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then((data) => {
        set({
          weatherData: data.weatherData,
          airData: data.aqiData,
        });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  setLocation: ({
    name,
    country_code,
  }: {
    name: string;
    country_code: string;
  }) => {
    set({ location: { name, country_code } });
  },
  getCityFromLatLon: async ({ lat, lon }: { lat: number; lon: number }) => {
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    const place = data?.[0];

    set({
      location: {
        name: place?.name,
        country_code: place?.country,
      },
    });
  },
}));
