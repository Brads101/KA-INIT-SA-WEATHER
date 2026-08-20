// Shapes returned by https://openweathermap.org/current
// GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric

export interface WeatherCondition {
  id: number;
  /** Broad group, e.g. "Clear", "Clouds", "Rain", "Snow", "Thunderstorm" */
  main: WeatherGroup;
  description: string;
  icon: string;
}

export type WeatherGroup =
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Mist"
  | "Smoke"
  | "Haze"
  | "Dust"
  | "Fog"
  | "Sand"
  | "Ash"
  | "Squall"
  | "Tornado"
  | "Clear"
  | "Clouds";

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherWind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface WeatherSys {
  country: string;
  sunrise: number;
  sunset: number;
}

/** Raw shape of GET /data/2.5/weather */
export interface WeatherResponse {
  id: number;
  name: string;
  cod: number | string;
  message?: string;
  weather: WeatherCondition[];
  main: WeatherMain;
  wind: WeatherWind;
  clouds: { all: number };
  visibility: number;
  dt: number;
  sys: WeatherSys;
  timezone: number;
}

/** Lightweight shape our app actually renders, derived from WeatherResponse */
export interface WeatherSummary {
  id: number;
  city: string;
  country: string;
  tempC: number;
  feelsLikeC: number;
  tempMinC: number;
  tempMaxC: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  condition: WeatherGroup;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  observedAt: number;
  isDaytime: boolean;
}
