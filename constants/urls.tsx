export const API_KEY = `a5a47c18197737e8eeca634cd6acb581`;
export const getWeatherList = (lat: string | null, lon: string | null): string =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
export const getPlaces = (q: string | null): string =>
    ` https://search.reservamos.mx/api/v2/places?q=${q}`;