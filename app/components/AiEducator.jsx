"use client"
import React, { useState } from 'react';

const AiEducator = () => {
  // State to manage the visibility of the chatbot iframe
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the chatbot's visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Outer container for centering and overall positioning
    <div className="border-2 fixed right-4 bottom-24 z-50"> {/* Fixed position for floating bubble */}
      {/* The chat bubble button/icon that toggles the chatbot */}
      <button
        onClick={toggleChatbot}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {/* You can replace this with an actual chat icon if you have one */}
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* The chatbot iframe, conditionally rendered based on 'isOpen' state */}
      {isOpen && (
        <div className="relative bg-gray-200 dark:bg-gray-700 rounded-xl p-4 max-w-sm md:max-w-md w-[calc(100vw-32px)] md:w-96 shadow-xl overflow-hidden mt-4"> {/* Adjusted max-width for a more typical chatbot size */}
          
          {/* The chat bubble "tail" */}
          {/* Note: The tail for a floating bubble needs to point up towards the button. */}
          {/* This tail is positioned at the top-right to connect to the button above it. */}
          <div className="absolute top-0 right-4 w-6 h-6 bg-gray-200 dark:bg-gray-700 transform rotate-45 -mt-3 rounded-sm"></div>

          {/* The iframe for the chatbot */}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/2_bSJIYVlx6ZfOOHWCxgw"
            width="100%"
            // Apply Tailwind for sizing and remove default border
            className="min-h-[500px] max-h-[70vh] border-none rounded-lg" // Adjusted min/max height for better fit in a floating bubble
            frameBorder="0"
            title="Open Edubot"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default AiEducator;