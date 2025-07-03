"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You'll still need to install axios: npm install axios

const WeatherBasedHealthAlert = () => {
    const [alertMessage, setAlertMessage] = useState('Loading weather-based health tips...');
    const [alertEmoji, setAlertEmoji] = useState('☁️');
    const [alertClasses, setAlertClasses] = useState('bg-gray-100 text-gray-700'); // Default loading state classes

    // --- For Lahore, Pakistan - using approximate coordinates for simplicity ---
    // You could implement browser geolocation here for dynamic user location
    const LATITUDE = 31.5497; // Latitude for Lahore
    const LONGITUDE = 74.3436; // Longitude for Lahore
    const UNITS = 'celsius'; // or 'fahrenheit'

    useEffect(() => {
        const fetchWeatherAlert = async () => {
            try {
                // Open-Meteo API endpoint for current weather and daily forecast (simplified)
                const response = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max&timezone=Asia%2FKarachi&temperature_unit=${UNITS}`
                );

                const weatherData = response.data;
                const currentWeather = weatherData.current_weather;
                const dailyForecast = weatherData.daily;

                const temp = currentWeather.temperature; // Current temperature
                const weatherCode = currentWeather.weathercode; // WMO weather interpretation code
                const windSpeed = currentWeather.windspeed; // Current wind speed

                // For daily max/min, we'll use today's forecast (index 0)
                const maxTempToday = dailyForecast.temperature_2m_max[0];
                const minTempToday = dailyForecast.temperature_2m_min[0];


                let message = '';
                let emoji = '';
                let classes = '';

                // --- Helper function to interpret WMO Weather Codes (simplified) ---
                // Full list: https://www.open-meteo.com/en/docs
                const getWeatherDescriptionAndEmoji = (code) => {
                    if (code >= 0 && code <= 3) return { desc: 'clear/partly cloudy', emoji: '☀️' }; // Clear sky, cloudy
                    if (code >= 45 && code <= 48) return { desc: 'foggy', emoji: '🌫️' }; // Fog, depositing fog
                    if (code >= 51 && code <= 55) return { desc: 'drizzle', emoji: '🌧️' }; // Drizzle
                    if (code >= 61 && code <= 65) return { desc: 'rain', emoji: '☔' }; // Rain
                    if (code >= 71 && code <= 75) return { desc: 'snow', emoji: '🌨️' }; // Snow fall
                    if (code >= 80 && code <= 82) return { desc: 'rain showers', emoji: '⛈️' }; // Rain showers
                    if (code >= 95 && code <= 99) return { desc: 'thunderstorm', emoji: '⚡' }; // Thunderstorm
                    return { desc: 'various conditions', emoji: '❓' };
                };

                const { desc: weatherDesc, emoji: weatherEmoji } = getWeatherDescriptionAndEmoji(weatherCode);

                // --- Decision Logic for Alerts based on Weather ---
                // Prioritize extreme conditions
                if (temp > 38 || maxTempToday > 40) { // Very hot (adjust thresholds for Lahore)
                    message = `It's ${temp}°C in Lahore with a max of ${maxTempToday}°C today! Extreme heat warning. Stay indoors & hydrated.`;
                    emoji = '🥵';
                    classes = 'bg-red-100 text-red-800';
                } else if (temp > 30 || maxTempToday > 35) { // Hot
                    message = `It's ${temp}°C. Warm day in Lahore (${maxTempToday}°C max). Remember to hydrate and use sun protection.`;
                    emoji = '☀️';
                    classes = 'bg-yellow-100 text-yellow-800';
                } else if (temp < 8 || minTempToday < 5) { // Cold
                    message = `It's ${temp}°C. Chilly day in Lahore (${minTempToday}°C min). Dress warmly and boost immunity.`;
                    emoji = '🥶';
                    classes = 'bg-blue-100 text-blue-800';
                } else if (weatherCode >= 61 && weatherCode <= 82) { // Rain or showers
                    message = `Rain expected today! Be careful with outdoor activities. Don't forget your umbrella.`;
                    emoji = weatherEmoji;
                    classes = 'bg-blue-200 text-blue-800';
                } else if (weatherCode >= 45 && weatherCode <= 48) { // Foggy/Hazy
                    message = `Hazy/foggy conditions in Lahore. Air quality might be affected. Consider wearing a mask outdoors.`;
                    emoji = weatherEmoji;
                    classes = 'bg-gray-200 text-gray-800';
                } else if (windSpeed > 15) { // Strong winds (adjust threshold)
                    message = `Windy day in Lahore (${windSpeed} km/h). Watch out for dust and potential allergens.`;
                    emoji = '💨';
                    classes = 'bg-gray-100 text-gray-700';
                } else { // Default pleasant weather
                    message = `Enjoy the pleasant weather in Lahore (${temp}°C, ${weatherDesc})! A great day for light outdoor activities.`;
                    emoji = weatherEmoji;
                    classes = 'bg-green-100 text-green-800';
                }

                setAlertMessage(message);
                setAlertEmoji(emoji);
                setAlertClasses(classes);

            } catch (error) {
                console.error("Error fetching weather data from Open-Meteo:", error);
                setAlertMessage('Could not fetch daily weather alerts at this time. Please try again later.');
                setAlertEmoji('⚠️');
                setAlertClasses('bg-red-100 text-red-800');
            }
        };

        fetchWeatherAlert();

        // Optional: Refetch weather periodically (e.g., every 30 minutes to an hour)
        // const intervalId = setInterval(fetchWeatherAlert, 1800000); // Every 30 minutes
        // return () => clearInterval(intervalId); // Cleanup on unmount

    }, []); // Empty dependency array as coordinates are fixed for this example

    if (!alertMessage) {
        return null;
    }

    return (
        <div
            className={`
                p-3 md:p-4
                text-center
                text-lg md:text-xl
                font-semibold
                mb-6 md:mb-8
                rounded-lg
                shadow-md
                flex items-center justify-center
                gap-3 md:gap-4
                ${alertClasses}
            `}
        >
            {alertEmoji && <span className="text-2xl md:text-3xl">{alertEmoji}</span>}
            <span>{alertMessage}</span>
        </div>
    );
};

export default WeatherBasedHealthAlert;