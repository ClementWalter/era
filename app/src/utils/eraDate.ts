import { MONTH_NAMES, LEAP_MONTH } from '../data/eras';
import type { Era } from '../data/eras';

export interface EraDate {
  day: number;        // 1-30 (or 1-5/6 for Singularity)
  month: number;      // 0-11 (or 12 for Singularity)
  monthName: string;  // e.g., "Turing" or "Singularity"
  year: number;       // 1+
  dayOfYear: number;  // 1-365/366
  era: Era;
}

const DAYS_PER_MONTH = 30;
const MONTHS_PER_YEAR = 12;
const REGULAR_DAYS = DAYS_PER_MONTH * MONTHS_PER_YEAR; // 360
const DAYS_PER_YEAR = 365;

/**
 * Convert a Gregorian date to an Era date
 */
export function toEraDate(gregorian: Date, era: Era): EraDate {
  const releaseDate = new Date(era.releaseDate);
  releaseDate.setHours(0, 0, 0, 0);
  
  const target = new Date(gregorian);
  target.setHours(0, 0, 0, 0);
  
  // Calculate days since release (day 1 = release day)
  const diffTime = target.getTime() - releaseDate.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  if (totalDays < 1) {
    // Before the era started
    return {
      day: totalDays,
      month: -1,
      monthName: 'Before Era',
      year: 0,
      dayOfYear: totalDays,
      era,
    };
  }
  
  // Calculate year (1-indexed)
  const year = Math.floor((totalDays - 1) / DAYS_PER_YEAR) + 1;
  
  // Day within the current year (1-365/366)
  const dayOfYear = ((totalDays - 1) % DAYS_PER_YEAR) + 1;
  
  // Calculate month and day within month
  let month: number;
  let day: number;
  let monthName: string;
  
  if (dayOfYear <= REGULAR_DAYS) {
    // Regular months (Turing through Amodei)
    month = Math.floor((dayOfYear - 1) / DAYS_PER_MONTH);
    day = ((dayOfYear - 1) % DAYS_PER_MONTH) + 1;
    monthName = MONTH_NAMES[month];
  } else {
    // Singularity (leap days)
    month = 12;
    day = dayOfYear - REGULAR_DAYS;
    monthName = LEAP_MONTH;
  }
  
  return {
    day,
    month,
    monthName,
    year,
    dayOfYear,
    era,
  };
}

/**
 * Convert an Era date back to Gregorian
 */
export function toGregorian(eraDate: EraDate): Date {
  const { day, month, year, era } = eraDate;
  
  // Calculate day of year
  let dayOfYear: number;
  if (month === 12) {
    // Singularity
    dayOfYear = REGULAR_DAYS + day;
  } else {
    dayOfYear = month * DAYS_PER_MONTH + day;
  }
  
  // Total days since era start
  const totalDays = (year - 1) * DAYS_PER_YEAR + dayOfYear;
  
  // Add to release date
  const result = new Date(era.releaseDate);
  result.setDate(result.getDate() + totalDays - 1);
  
  return result;
}

/**
 * Format an Era date as a string
 */
export function formatEraDate(eraDate: EraDate, format: 'full' | 'short' = 'full'): string {
  if (eraDate.year < 1) {
    return `Before ${eraDate.era.name} Era`;
  }
  
  if (format === 'short') {
    return `${eraDate.day} ${eraDate.monthName}`;
  }
  
  return `${eraDate.day} ${eraDate.monthName}, Year ${eraDate.year}`;
}

/**
 * Get all days in a month for calendar display
 */
export function getMonthDays(year: number, month: number, era: Era): EraDate[] {
  const days: EraDate[] = [];
  const daysInMonth = month === 12 ? (isLeapYear(year) ? 6 : 5) : DAYS_PER_MONTH;
  
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      month,
      monthName: month === 12 ? LEAP_MONTH : MONTH_NAMES[month],
      year,
      dayOfYear: month * DAYS_PER_MONTH + day,
      era,
    });
  }
  
  return days;
}

/**
 * Check if an era year is a leap year (has 6 Singularity days instead of 5)
 */
export function isLeapYear(year: number): boolean {
  // For simplicity, mirror Gregorian leap years
  // Year 1 of era maps to release year
  return year % 4 === 0;
}

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(month: number, year: number): number {
  if (month === 12) {
    return isLeapYear(year) ? 6 : 5;
  }
  return DAYS_PER_MONTH;
}
