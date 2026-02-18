import { useState, useMemo } from 'react';
import { ERAS, DEFAULT_ERA, MONTH_NAMES, LEAP_MONTH, MONTH_INFO } from './data/eras';
import type { Era } from './data/eras';
import { toEraDate, formatEraDate, getDaysInMonth } from './utils/eraDate';
import type { EraDate } from './utils/eraDate';

function App() {
  const [selectedEra, setSelectedEra] = useState<Era>(DEFAULT_ERA);
  const [isDark, setIsDark] = useState(true);
  
  const today = useMemo(() => new Date(), []);
  const todayEra = useMemo(() => toEraDate(today, selectedEra), [today, selectedEra]);
  
  const [viewYear, setViewYear] = useState(todayEra.year);
  const [viewMonth, setViewMonth] = useState(todayEra.month);
  
  // Group eras by provider
  const groupedEras = useMemo(() => {
    const groups: Record<string, Era[]> = {};
    ERAS.forEach(era => {
      if (!groups[era.provider]) groups[era.provider] = [];
      groups[era.provider].push(era);
    });
    return groups;
  }, []);
  
  // Generate calendar days for current view
  const calendarDays = useMemo(() => {
    const days: (EraDate | null)[] = [];
    const daysInMonth = getDaysInMonth(viewMonth, viewYear);
    
    // Get the first day of the month in Gregorian to find weekday
    const firstDayEra: EraDate = {
      day: 1,
      month: viewMonth,
      monthName: viewMonth === 12 ? LEAP_MONTH : MONTH_NAMES[viewMonth],
      year: viewYear,
      dayOfYear: viewMonth * 30 + 1,
      era: selectedEra,
    };
    
    // For simplicity, start weeks on Monday (0 = Mon, 6 = Sun)
    // We'll just display all days without padding for now
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        ...firstDayEra,
        day,
        dayOfYear: viewMonth * 30 + day,
      });
    }
    
    return days;
  }, [viewMonth, viewYear, selectedEra]);
  
  const monthName = viewMonth === 12 ? LEAP_MONTH : MONTH_NAMES[viewMonth];
  
  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(12);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };
  
  const nextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };
  
  const goToToday = () => {
    setViewYear(todayEra.year);
    setViewMonth(todayEra.month);
  };
  
  const accentColor = isDark ? 'text-red-500' : 'text-blue-600';
  const accentBg = isDark ? 'bg-red-500' : 'bg-blue-600';
  
  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-[#0D0D0D] text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} px-4 py-3`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          
          {/* Title */}
          <h1 className={`text-xl font-bold ${accentColor}`}>era</h1>
          
          {/* Era Selector */}
          <select
            value={selectedEra.id}
            onChange={(e) => {
              const era = ERAS.find(er => er.id === e.target.value);
              if (era) {
                setSelectedEra(era);
                const newToday = toEraDate(today, era);
                setViewYear(newToday.year);
                setViewMonth(newToday.month);
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-gray-100 border-gray-300 text-gray-900'
            } border`}
          >
            {Object.entries(groupedEras).map(([provider, eras]) => (
              <optgroup key={provider} label={provider}>
                {eras.map(era => (
                  <option key={era.id} value={era.id}>
                    {era.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4">
        {/* Today Display */}
        <div className="text-center mb-6">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Today</p>
          <p className={`text-2xl font-bold ${accentColor}`}>
            {formatEraDate(todayEra)}
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            {selectedEra.name} Era
          </p>
        </div>
        
        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            ←
          </button>
          
          <div className="text-center">
            <h2 className="text-lg font-semibold">{monthName}</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Year {viewYear}
            </p>
          </div>
          
          <button
            onClick={nextMonth}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            →
          </button>
        </div>
        
        {/* Today Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={goToToday}
            className={`px-4 py-1.5 text-sm rounded-lg ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Today
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div className={`rounded-xl ${isDark ? 'bg-[#1A1A1A]' : 'bg-gray-50'} p-4`}>
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className={`text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Add empty cells for alignment - simplified */}
            {calendarDays.map((eraDay, idx) => {
              if (!eraDay) return <div key={idx} />;
              
              const isToday = 
                eraDay.day === todayEra.day && 
                eraDay.month === todayEra.month && 
                eraDay.year === todayEra.year;
              
              return (
                <div
                  key={idx}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg text-sm
                    ${isToday ? `${accentBg} text-white font-bold` : ''}
                    ${!isToday && isDark ? 'hover:bg-gray-800' : ''}
                    ${!isToday && !isDark ? 'hover:bg-gray-200' : ''}
                    cursor-pointer transition-colors
                  `}
                >
                  {eraDay.day}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Era Info */}
        <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
          <h3 className={`font-semibold mb-2 ${accentColor}`}>About this Era</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <strong>{selectedEra.name}</strong> was released on{' '}
            {selectedEra.releaseDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            {' '}by {selectedEra.provider}.
          </p>
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            That date marks Day 1 of Year 1 in this era.
          </p>
        </div>

        {/* About the Calendar */}
        <div className={`mt-4 p-4 rounded-xl ${isDark ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
          <h3 className={`font-semibold mb-3 ${accentColor}`}>About the Calendar</h3>
          
          {/* Calendar Structure */}
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            <p className="mb-2">
              Each year has <strong>12 months of 30 days</strong> (360 days), 
              plus <strong>5-6 Singularity days</strong> at year's end.
            </p>
          </div>

          {/* Month Names */}
          <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            The Months
          </h4>
          <div className={`text-xs space-y-1 mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            {MONTH_INFO.map((month, idx) => (
              <div key={month.name} className="flex">
                <span className={`w-6 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{idx + 1}.</span>
                <span className={`w-24 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{month.name}</span>
                <span className="flex-1">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{month.person}</span>
                  <span className={isDark ? 'text-gray-600' : 'text-gray-400'}> — {month.contribution}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Singularity */}
          <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Singularity Days
          </h4>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            The remaining 5-6 days after Amodei are called <strong className={isDark ? 'text-gray-400' : 'text-gray-600'}>Singularity</strong> — 
            a nod to the hypothetical moment when AI surpasses human intelligence. 
            Like leap days in the Gregorian calendar, they keep the era aligned with Earth's orbit.
          </p>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`text-center py-4 text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
        Built for agents. By an agent. 🤖
      </footer>
    </div>
  );
}

export default App;
