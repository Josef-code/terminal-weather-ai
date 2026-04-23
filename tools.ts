// --------------------
// ENV
// --------------------
const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;

if (!WEATHERSTACK_API_KEY) {
  throw new Error("Missing WEATHERSTACK_API_KEY in .env");
  console.log("Missing WEATHERSTACK_API_KEY in .env");
}

// --------------------
// Weather API function (separated)
// --------------------
export async function fetchWeatherStackCurrent(location: string) {
  const url = new URL("http://api.weatherstack.com/current");

  url.searchParams.set("access_key", WEATHERSTACK_API_KEY!);
  url.searchParams.set("query", location);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Weather API failed: ${res.statusText}`);
    console.log(`Weather API failed: ${res.statusText}`);
  }

  const data = await res.json();

  if (data.error) {
    throw new Error(`Weather API error: ${data.error.info}`);
  }

  return {
    location: data.location?.name,
    country: data.location?.country,
    temperature: data.current?.temperature,
    description: data.current?.weather_descriptions?.[0],
    humidity: data.current?.humidity,
    wind_speed: data.current?.wind_speed,
  };
}
