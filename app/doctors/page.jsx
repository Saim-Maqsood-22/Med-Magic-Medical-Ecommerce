"use client"
import { useState,useEffect } from 'react';

const DoctorBookingSelection = ({ onDoctorSelect }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);


  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.8,
      reviews: 124,
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      rating: 4.9,
      reviews: 98,
      experience: '15 years',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    },
    {
      id: 3,
      name: 'Dr. Emily Wilson',
      specialty: 'Pediatrician',
      rating: 4.7,
      reviews: 156,
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    }
  ];

  const handleSelect = (doctor) => {
    setSelectedDoctor(doctor);
    if (onDoctorSelect) {
      onDoctorSelect(doctor); // Pass selected doctor to parent component
    }
  };
  useEffect(() => {
    document.title = "medMagic - Doctors";
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Select a Doctor</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div 
            key={doctor.id}
            onClick={() => handleSelect(doctor)}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedDoctor?.id === doctor.id 
                ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' 
                : 'hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-start space-x-4">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-yellow-500">★ {doctor.rating}</span>
                  <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {doctor.experience} experience
                </div>
              </div>
            </div>
            
            {selectedDoctor?.id === doctor.id && (
              <div className="mt-4 pt-3 border-t border-blue-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Selected</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-green-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Ready to book with {selectedDoctor.name}?</h3>
              <p className="text-sm text-gray-600">You'll be redirected to our booking system</p>
            </div>
            <button
              onClick={() => window.open('/appointments', '_blank')}
              className="mt-3 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Continue to Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorBookingSelection;