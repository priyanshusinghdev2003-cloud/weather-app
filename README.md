# Weather App

A modern, responsive weather application built with Next.js that provides real-time weather information, forecasts, and air quality data.

## Features

- **Current Weather**: Displays current temperature, wind speed, humidity, pressure, visibility, and cloud status
- **5-Day Forecast**: Shows daily high and low temperatures for the next 5 days
- **Hourly Forecast**: Provides today's weather every 3 hours
- **Air Quality Index**: Monitors PM2.5, PM10, NO2, SO2, and O3 levels
- **Sunrise/Sunset Times**: Displays daily sunrise and sunset information
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: Enhanced user experience with Framer Motion
- **Geolocation Support**: Automatically fetches weather based on coordinates

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Device Detection**: React Device Detect
- **Weather API**: Open-Meteo API
- **Air Quality API**: Open-Meteo Air Quality API

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
weather-app/
├── app/
│   ├── api/weather/route.ts    # Weather API endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page component
├── components/
│   ├── FiveDayForeCast.tsx     # 5-day forecast component
│   ├── Navbar.tsx              # Navigation component
│   ├── skeleton.tsx            # Loading skeleton
│   ├── TemperatureCard.tsx     # Temperature display card
│   ├── TodayWeather.tsx        # Today's hourly weather
│   └── WeatherInfo.tsx         # Weather details component
├── store/
│   └── weather.ts              # Zustand store for weather state
├── utility/
│   └── utilityfunction.ts      # Utility functions for data formatting
└── public/
    └── weather/                # Weather icons
```

## API Usage

The application uses the following APIs:

- **Open-Meteo Weather API**: Provides weather forecast data
- **Open-Meteo Air Quality API**: Supplies air quality information

The API endpoint `/api/weather` accepts latitude and longitude parameters and returns combined weather and air quality data.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Icons from [Lucide React](https://lucide.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
