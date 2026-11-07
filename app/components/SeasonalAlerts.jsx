"use client"
import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import axios from 'axios';

const WeatherBasedHealthAlert = () => {
    const [alertMessage, setAlertMessage] = useState('Loading weather-based health tips...');
    const [alertEmoji, setAlertEmoji] = useState('☁️');
    const [alertClasses, setAlertClasses] = useState('bg-gray-100 text-gray-700');

    // Use a ref to track if the component is mounted
    const isMounted = useRef(true);

    // --- For Lahore, Pakistan - using approximate coordinates for simplicity ---
    const LATITUDE = 31.5497; // Latitude for Lahore
    const LONGITUDE = 74.3436; // Longitude for Lahore
    const UNITS = 'celsius'; // or 'fahrenheit'

    useEffect(() => {
        // Set isMounted to true when component mounts
        isMounted.current = true;

        const fetchWeatherAlert = async () => {
            try {
                const response = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max&timezone=Asia%2FKarachi&temperature_unit=${UNITS}`
                );

                const weatherData = response.data;
                const currentWeather = weatherData.current_weather;
                const dailyForecast = weatherData.daily;

                const temp = currentWeather.temperature;
                const weatherCode = currentWeather.weathercode;
                const windSpeed = currentWeather.windspeed;
                const maxTempToday = dailyForecast.temperature_2m_max[0];
                const minTempToday = dailyForecast.temperature_2m_min[0];

                let message = '';
                let emoji = '';
                let classes = '';

                const getWeatherDescriptionAndEmoji = (code) => {
                    if (code >= 0 && code <= 3) return { desc: 'clear/partly cloudy', emoji: '☀️' };
                    if (code >= 45 && code <= 48) return { desc: 'foggy', emoji: '🌫️' };
                    if (code >= 51 && code <= 55) return { desc: 'drizzle', emoji: '🌧️' };
                    if (code >= 61 && code <= 65) return { desc: 'rain', emoji: '☔' };
                    if (code >= 71 && code <= 75) return { desc: 'snow', emoji: '🌨️' };
                    if (code >= 80 && code <= 82) return { desc: 'rain showers', emoji: '⛈️' };
                    if (code >= 95 && code <= 99) return { desc: 'thunderstorm', emoji: '⚡' };
                    return { desc: 'various conditions', emoji: '❓' };
                };

                const { desc: weatherDesc, emoji: weatherEmoji } = getWeatherDescriptionAndEmoji(weatherCode);

                if (temp > 38 || maxTempToday > 40) {
                    message = `It's ${temp}°C in Lahore with a max of ${maxTempToday}°C today! Extreme heat warning. Stay indoors & hydrated.`;
                    emoji = '🥵';
                    classes = 'bg-red-100 text-red-800';
                } else if (temp > 30 || maxTempToday > 35) {
                    message = `It's ${temp}°C. Warm day in Lahore (${maxTempToday}°C max). Remember to hydrate and use sun protection.`;
                    emoji = '☀️';
                    classes = 'bg-yellow-100 text-yellow-800';
                } else if (temp < 8 || minTempToday < 5) {
                    message = `It's ${temp}°C. Chilly day in Lahore (${minTempToday}°C min). Dress warmly and boost immunity.`;
                    emoji = '🥶';
                    classes = 'bg-blue-100 text-blue-800';
                } else if (weatherCode >= 61 && weatherCode <= 82) {
                    message = `Rain expected today! Be careful with outdoor activities. Don't forget your umbrella.`;
                    emoji = weatherEmoji;
                    classes = 'bg-blue-200 text-blue-800';
                } else if (weatherCode >= 45 && weatherCode <= 48) {
                    message = `Hazy/foggy conditions in Lahore. Air quality might be affected. Consider wearing a mask outdoors.`;
                    emoji = weatherEmoji;
                    classes = 'bg-gray-200 text-gray-800';
                } else if (windSpeed > 15) {
                    message = `Windy day in Lahore (${windSpeed} km/h). Watch out for dust and potential allergens.`;
                    emoji = '💨';
                    classes = 'bg-gray-100 text-gray-700';
                } else {
                    message = `Enjoy the pleasant weather in Lahore (${temp}°C, ${weatherDesc})! A great day for light outdoor activities.`;
                    emoji = weatherEmoji;
                    classes = 'bg-green-100 text-green-800';
                }

                // Only update state if the component is still mounted
                if (isMounted.current) {
                    setAlertMessage(message);
                    setAlertEmoji(emoji);
                    setAlertClasses(classes);
                }

            } catch (error) {
                console.error("Error fetching weather data from Open-Meteo:", error);
                // Only update state if the component is still mounted
                if (isMounted.current) {
                    setAlertMessage('Could not fetch daily weather alerts at this time. Please try again later.');
                    setAlertEmoji('⚠️');
                    setAlertClasses('bg-red-100 text-red-800');
                }
            }
        };

        // Call immediately on mount
        fetchWeatherAlert();

        // Set up the interval to refetch weather periodically
        // For a public facing site, consider a longer interval (e.g., 30 mins to 1 hour)
        const intervalId = setInterval(fetchWeatherAlert, 1800000); // Every 30 minutes (1800000 ms)

        // Cleanup function: runs when the component unmounts
        return () => {
            isMounted.current = false; // Mark component as unmounted
            clearInterval(intervalId); // Clear the interval to prevent further calls
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

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