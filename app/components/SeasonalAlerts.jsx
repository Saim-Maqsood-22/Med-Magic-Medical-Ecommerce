"use client"
import React, { useState, useEffect } from 'react';

const SeasonalHealthAlert = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertEmoji, setAlertEmoji] = useState('');
    const [alertClasses, setAlertClasses] = useState(''); // Tailwind classes

    useEffect(() => {
        const today = new Date();
        const month = today.getMonth(); // 0 for January, 11 for December

        // Determine season based on months relevant to Lahore, Pakistan
        // This is a simplified approximation
        if (month >= 2 && month <= 4) { // March, April, May (Spring)
            setAlertMessage('Spring is blooming! Don\'t forget your allergy relief.');
            setAlertEmoji('🌸');
            setAlertClasses('bg-green-100 text-green-800'); // Light green background, dark green text
        } else if (month >= 5 && month <= 8) { // June, July, August, September (Summer)
            setAlertMessage('Beat the heat! Stay hydrated and protect from sun exposure.');
            setAlertEmoji('☀️');
            setAlertClasses('bg-yellow-100 text-yellow-800'); // Light yellow background, dark yellow text
        } else if (month >= 9 && month <= 10) { // October, November (Autumn)
            setAlertMessage('Autumn is here. Prepare for cooler weather and seasonal changes.');
            setAlertEmoji('🍂');
            setAlertClasses('bg-orange-100 text-orange-800'); // Light orange background, dark orange text
        } else { // December, January, February (Winter)
            setAlertMessage('Winter chills! Boost your immunity and stay warm.');
            setAlertEmoji('❄️');
            setAlertClasses('bg-blue-100 text-blue-800'); // Light blue background, dark blue text
        }
    }, []); // Empty dependency array means this effect runs once after initial render

    if (!alertMessage) {
        return null; // Don't render anything if no message is set (e.g., during initial render before useEffect runs)
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

export default SeasonalHealthAlert;