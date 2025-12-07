"use client";
import { useWeatherStore } from "@/store/weather";
import { debounceFuncton } from "@/utility/utilityfunction";
import { Cloud, LocateFixed, LocationEdit, Search } from "lucide-react";
import { useRef, useState } from "react";

function Navbar() {
  const [q, setQ] = useState<string>("");
  const { getWeatherDataBasesOnLatAndLong, setLocation, getCityFromLatLon } =
    useWeatherStore();
  const [city, setCity] = useState<string>("");

  const getCurrentLocation = () => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherDataBasesOnLatAndLong(latitude, longitude);
      getCityFromLatLon({ lat: latitude, lon: longitude });
    });
  };

  const [results, setResults] = useState([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQ(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }
      debouncedSearch.current(value);
  };
  const debouncedSearch = useRef(
  debounceFuncton(async (value: string) => {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${value}`
    );
    const data = await res.json();
    setResults(data?.results || []);
  }, 700)
);
  return (
    <div className="w-full flex justify-between items-center mt-2">
      <div className="flex items-center gap-2">
        <Cloud size={40} color="#ffffff" className="" />
        <h1 className="text-white text-lg font-semibold">weatherio</h1>
      </div>
      <div className="bg-[#111] w-[40%] rounded-full flex items-center gap-2 h-12 relative">
        <Search size={20} color="#ffffff" className="ml-5" />
        <input
          type="text"
          placeholder="Search city..."
          className="outline-none focus:outline-none bg-transparent w-full"
          value={q}
          onChange={(e) => handleSearch(e)}
        />

        <div className="absolute top-12 left-0 w-full bg-[#111] rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 scrollbar-hide">
          {q &&
            results?.map((result: any) => (
              <div
                key={result.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-[#222] transition cursor-pointer border-b border-white/10"
                onClick={() => {
                  setCity(result.name);
                  getWeatherDataBasesOnLatAndLong(
                    result.latitude,
                    result.longitude
                  );
                  setLocation({
                    name: result.name,
                    country_code: result.country_code,
                  });
                  setQ("");
                }}
              >
                <div className="flex items-center gap-3">
                  <LocationEdit className="text-gray-300" />
                  <p className="text-gray-100">{result.name}</p>
                </div>

                <p className="text-gray-400 text-sm">{result.country_code}</p>
              </div>
            ))}
        </div>
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer bg-pink-300 rounded-full px-2 py-1 text-black"
        onClick={getCurrentLocation}
      >
        <LocateFixed color="#000000" />
        <p className="md:block hidden">Current Location</p>
      </div>
    </div>
  );
}

export default Navbar;
