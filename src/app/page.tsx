'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

interface Earthquake {
  _id: string;
  earthquake_id: string;
  title: string;
  date: string;
  mag: number;
  depth: number;
  geojson: {
    coordinates: [number, number];
  };
}

export default function Home() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const response = await axios.get('https://api.orhanaydogdu.com.tr/deprem/kandilli/live');
        const sortedData = response.data.result.sort((a: Earthquake, b: Earthquake) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setEarthquakes(sortedData);
      } catch (error) {
        console.error('Veri çekerken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 60000);
    return () => clearInterval(interval);
  }, []);

  const openGoogleMaps = (coordinates: [number, number]) => {
    window.open(`https://www.google.com/maps?q=${coordinates[1]},${coordinates[0]}`, '_blank');
  };

  const getMagnitudeColor = (magnitude: number) => {
    if (magnitude >= 6) return 'bg-gradient-to-br from-red-500 to-red-600';
    if (magnitude >= 4) return 'bg-gradient-to-br from-orange-400 to-orange-500';
    return 'bg-gradient-to-br from-green-400 to-green-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
        Türkiye Deprem Verileri
      </h1>
      <div className="max-w-5xl mx-auto space-y-4">
        {earthquakes.map((quake) => (
          <div
            key={quake._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl p-6 transform transition-all duration-300 ease-in-out hover:scale-[1.02] border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-3">
                  {quake.title}
                </h2>
                <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    Derinlik: <span className="font-semibold">{quake.depth.toFixed(1)} km</span>
                  </div>
                  <button
                    onClick={() => openGoogleMaps(quake.geojson.coordinates)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center gap-2 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {quake.geojson.coordinates[1].toFixed(4)}, {quake.geojson.coordinates[0].toFixed(4)}
                  </button>
                </div>
              </div>
              <div className={`${getMagnitudeColor(quake.mag)} text-white font-bold text-2xl rounded-xl p-4 min-w-[90px] flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-105`}>
                {quake.mag.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
