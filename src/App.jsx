import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "cee78d983177c4811328a4485638dbde";

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("City not found. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  // Add weather backgrounds mapping
  // const weatherBackgrounds = {
  //   Clear: "bg-gradient-to-br from-yellow-400 to-blue-400",
  //   Clouds: "bg-gradient-to-br from-gray-400 to-blue-300",
  //   Rain: "bg-gradient-to-br from-gray-600 to-blue-600",
  //   Snow: "bg-gradient-to-br from-blue-100 to-gray-200",
  //   Thunderstorm: "bg-gradient-to-br from-gray-800 to-blue-900",
  //   Drizzle: "bg-gradient-to-br from-gray-400 to-blue-400",
  //   Mist: "bg-gradient-to-br from-gray-300 to-gray-400",
  //   default: "bg-gradient-to-br from-blue-400 to-purple-500",
  // };
  // const getBackgroundClass = () => {
  //   if (!weather) return weatherBackgrounds.default;
  //   return (
  //     weatherBackgrounds[weather.weather[0].main] || weatherBackgrounds.default
  //   );
  // };

  const weatherBackgrounds = {
    Clear:
      "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1974&auto=format&fit=crop",
    Clouds:
      "https://images.unsplash.com/photo-1611928482473-7b27d24eab80?q=80&w=2070&auto=format&fit=crop",
    Rain: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2070&auto=format&fit=crop",
    Snow: "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=2070&auto=format&fit=crop",
    Thunderstorm:
      "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2071&auto=format&fit=crop",
    Drizzle:
      "https://images.unsplash.com/photo-1541919329513-35f7af297129?q=80&w=2070&auto=format&fit=crop",
    Mist: "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=2069&auto=format&fit=crop",
    default:
      "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?q=80&w=2074&auto=format&fit=crop",
  };

  const getBackgroundImage = () => {
    if (!weather) return weatherBackgrounds.default;
    return (
      weatherBackgrounds[weather.weather[0].main] || weatherBackgrounds.default
    );
  };

  return (
    <div
      className="min-h-screen relative flex justify-center items-center p-4 transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-gradient-to-br from-blue-400/80 via-purple-400/70 to-pink-400/80 backdrop-blur-lg p-8 rounded-2xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:scale-[1.01] w-full max-w-[600px] font-poppins">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Weather Forecast
        </h1>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-4 bg-white/70 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all pl-12"
              placeholder="Enter city name..."
            />
            <svg
              className="w-6 h-6 absolute left-3 top-4 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button
  type="submit"
  className="w-full bg-gradient-to-r from-blue-400/90 via-purple-400/90 to-pink-400/90 text-white p-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50  shadow-lg hover:shadow-xl hover:from-blue-500/90 hover:via-purple-500/90 hover:to-pink-500/90"
  disabled={loading}
>
  {loading ? "Searching..." : "Get Weather"}
</button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-400/20 text-red-100 rounded-xl text-center border border-red-200/30">
            {error}
          </div>
        )}

        {weather && (
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-white/80">
                {new Date(weather.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-20 h-20"
              />
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white">
                  {Math.round(weather.main.temp)}°C
                </h3>
                <p className="text-lg capitalize text-white/80">
                  {weather.weather[0].description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <p className="text-white/80">Feels Like</p>
                <p className="text-xl font-semibold text-white">
                  {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <p className="text-white/80">Humidity</p>
                <p className="text-xl font-semibold text-white">
                  {weather.main.humidity}%
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <p className="text-white/80">Wind Speed</p>
                <p className="text-xl font-semibold text-white">
                  {weather.wind.speed} m/s
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                <p className="text-white/80">Pressure</p>
                <p className="text-xl font-semibold text-white">
                  {weather.main.pressure} hPa
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="absolute bottom-4 right-4 text-gray-400 italic">Opedev</p>
    </div>
  );
}

export default App;
