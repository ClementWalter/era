import { useState, useMemo } from 'react';
import { ERAS, DEFAULT_ERA, MONTH_NAMES, LEAP_MONTH, MONTH_INFO } from './data/eras';
import type { Era } from './data/eras';
import { toEraDate, toGregorian, formatEraDate, getDaysInMonth } from './utils/eraDate';
import type { EraDate } from './utils/eraDate';

function App() {
  const [selectedEra, setSelectedEra] = useState<Era>(DEFAULT_ERA);
  const [isDark, setIsDark] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  
  const today = useMemo(() => new Date(), []);
  const todayEra = useMemo(() => toEraDate(today, selectedEra), [today, selectedEra]);
  
  const [viewYear, setViewYear] = useState(todayEra.year);
  const [viewMonth, setViewMonth] = useState(todayEra.month);
  const [selectedDay, setSelectedDay] = useState<EraDate | null>(null);
  
  // The date to display (selected or today)
  const displayDate = selectedDay || todayEra;
  const displayGregorian = useMemo(() => toGregorian(displayDate), [displayDate]);
  
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
    
    const firstDayEra: EraDate = {
      day: 1,
      month: viewMonth,
      monthName: viewMonth === 12 ? LEAP_MONTH : MONTH_NAMES[viewMonth],
      year: viewYear,
      dayOfYear: viewMonth * 30 + 1,
      era: selectedEra,
    };
    
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
    setSelectedDay(null);
  };
  
  const selectDay = (eraDay: EraDate) => {
    setSelectedDay(eraDay);
  };
  
  const accentColor = isDark ? 'text-red-500' : 'text-blue-600';
  const accentBg = isDark ? 'bg-red-500' : 'bg-blue-600';
  
  return (
    <div className={`h-screen overflow-hidden flex flex-col transition-colors ${isDark ? 'bg-[#0D0D0D] text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`flex-shrink-0 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} px-4 py-2`}>
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
      <main className="flex-1 flex flex-col max-w-4xl mx-auto p-3 w-full overflow-hidden">
        {/* Selected/Today Display */}
        <div className="text-center mb-3">
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {selectedDay ? 'Selected' : 'Today'}
          </p>
          <p className={`text-xl font-bold ${accentColor}`}>
            {formatEraDate(displayDate)}
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            {displayGregorian.toLocaleDateString('en-US', { 
              weekday: 'short',
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={prevMonth}
            className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            ←
          </button>
          
          <div className="text-center">
            <h2 className="text-base font-semibold">{monthName}</h2>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Year {viewYear}
            </p>
          </div>
          
          <button
            onClick={nextMonth}
            className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            →
          </button>
        </div>
        
        {/* Today Button */}
        <div className="flex justify-center gap-2 mb-2">
          <button
            onClick={goToToday}
            className={`px-3 py-1 text-xs rounded-lg ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setShowAbout(true)}
            className={`px-3 py-1 text-xs rounded-lg ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            About
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div className={`flex-1 rounded-xl ${isDark ? 'bg-[#1A1A1A]' : 'bg-gray-50'} p-3 flex flex-col`}>
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className={`text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 flex-1">
            {calendarDays.map((eraDay, idx) => {
              if (!eraDay) return <div key={idx} />;
              
              const isToday = 
                eraDay.day === todayEra.day && 
                eraDay.month === todayEra.month && 
                eraDay.year === todayEra.year;
              
              const isSelected = selectedDay &&
                eraDay.day === selectedDay.day && 
                eraDay.month === selectedDay.month && 
                eraDay.year === selectedDay.year;
              
              return (
                <div
                  key={idx}
                  onClick={() => selectDay(eraDay)}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg text-sm
                    ${isToday ? `${accentBg} text-white font-bold` : ''}
                    ${isSelected && !isToday ? `ring-2 ${isDark ? 'ring-red-500 bg-red-500/20' : 'ring-blue-500 bg-blue-500/20'} font-semibold` : ''}
                    ${!isToday && !isSelected && isDark ? 'hover:bg-gray-800' : ''}
                    ${!isToday && !isSelected && !isDark ? 'hover:bg-gray-200' : ''}
                    cursor-pointer transition-colors
                  `}
                >
                  {eraDay.day}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Era Info - compact at bottom */}
        <div className={`mt-2 p-2 rounded-lg ${isDark ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
          <p className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            <strong className={isDark ? 'text-gray-400' : 'text-gray-600'}>{selectedEra.name}</strong> · Released {selectedEra.releaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`flex-shrink-0 text-center py-2 text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
        Built for agents. By an agent. 🤖
      </footer>

      {/* About Panel Overlay */}
      {showAbout && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowAbout(false)}
        />
      )}
      
      {/* About Side Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50
        transform transition-transform duration-300 ease-in-out
        ${showAbout ? 'translate-x-0' : 'translate-x-full'}
        ${isDark ? 'bg-[#1A1A1A]' : 'bg-white'}
        shadow-xl
      `}>
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-bold ${accentColor}`}>About the Calendar</h2>
            <button
              onClick={() => setShowAbout(false)}
              className={`p-1 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              ✕
            </button>
          </div>
          
          {/* Calendar Structure */}
          <div className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${accentColor}`}>How It Works</h3>
            <p className="text-sm mb-2">
              Each year has <strong>12 months of 30 days</strong> (360 days), plus <strong>5-6 Singularity days</strong> at year's end.
            </p>
            <p className="text-sm">
              Day 1 of Year 1 = the model's release date.
            </p>
          </div>

          {/* Month Names */}
          <div className="mb-4">
            <h3 className={`text-sm font-semibold mb-2 ${accentColor}`}>The Months</h3>
            <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Named after AI pioneers:
            </p>
            <div className={`space-y-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {MONTH_INFO.map((month, idx) => (
                <div key={month.name} className="flex items-start">
                  <span className={`w-6 flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{idx + 1}.</span>
                  <div>
                    <span className="font-medium">{month.name}</span>
                    <span className={`text-xs ml-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      ({month.person})
                    </span>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {month.contribution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Singularity */}
          <div>
            <h3 className={`text-sm font-semibold mb-2 ${accentColor}`}>Singularity Days</h3>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              The remaining 5-6 days after Amodei are called <strong>Singularity</strong> — a nod to the hypothetical moment when AI surpasses human intelligence.
            </p>
            <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Like leap days, they keep the era aligned with Earth's orbit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
