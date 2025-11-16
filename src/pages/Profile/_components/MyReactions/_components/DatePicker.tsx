import { useState, useEffect, useRef } from 'react';
import { SelectBottomSheet } from '../../../../../components/SelectBox/SelectBottomSheet';

interface DatePickerProps {
  title: string;
  initialDate: Date | null;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

export const DatePicker = ({ title, initialDate, onSelect, onClose }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate || new Date());

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 2 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0,
  ).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const yearRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToSelected = (ref: React.RefObject<HTMLDivElement | null>, index: number) => {
      if (ref.current) {
        const itemHeight = 48;
        ref.current.scrollTop = index * itemHeight;
      }
    };

    const yearIndex = years.indexOf(selectedDate.getFullYear());
    const monthIndex = selectedDate.getMonth();
    const dayIndex = selectedDate.getDate() - 1;

    scrollToSelected(yearRef, yearIndex);
    scrollToSelected(monthRef, monthIndex);
    scrollToSelected(dayRef, dayIndex);
  }, [selectedDate, years]);

  const handleYearChange = (year: number) => {
    const newDate = new Date(year, selectedDate.getMonth(), selectedDate.getDate());

    const lastDay = new Date(year, selectedDate.getMonth() + 1, 0).getDate();
    if (selectedDate.getDate() > lastDay) {
      newDate.setDate(lastDay);
    }
    setSelectedDate(newDate);
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(selectedDate.getFullYear(), month - 1, selectedDate.getDate());

    const lastDay = new Date(selectedDate.getFullYear(), month, 0).getDate();
    if (selectedDate.getDate() > lastDay) {
      newDate.setDate(lastDay);
    }
    setSelectedDate(newDate);
  };

  const handleDayChange = (day: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
  };

  const handleConfirm = () => {
    onSelect(selectedDate);
    onClose();
  };

  return (
    <SelectBottomSheet title={title} onClose={onClose}>
      <div className="flex justify-center gap-8 pb-4">
        <div className="flex-1">
          <div
            ref={yearRef}
            className="h-48 overflow-y-auto scroll-smooth snap-y snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {years.map((year) => {
              const isSelected = year === selectedDate.getFullYear();
              return (
                <div
                  key={year}
                  className={`h-12 flex items-center justify-center snap-center cursor-pointer ${
                    isSelected ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600'
                  }`}
                  onClick={() => handleYearChange(year)}
                >
                  <span className="B02_M">{year}년</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <div
            ref={monthRef}
            className="h-48 overflow-y-auto scroll-smooth snap-y snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {months.map((month) => {
              const isSelected = month === selectedDate.getMonth() + 1;
              return (
                <div
                  key={month}
                  className={`h-12 flex items-center justify-center snap-center cursor-pointer ${
                    isSelected ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600'
                  }`}
                  onClick={() => handleMonthChange(month)}
                >
                  <span className="B02_M">{month}월</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <div
            ref={dayRef}
            className="h-48 overflow-y-auto scroll-smooth snap-y snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {days.map((day) => {
              const isSelected = day === selectedDate.getDate();
              return (
                <div
                  key={day}
                  className={`h-12 flex items-center justify-center snap-center cursor-pointer ${
                    isSelected ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600'
                  }`}
                  onClick={() => handleDayChange(day)}
                >
                  <span className="B02_M">{day}일</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={handleConfirm}
        className="w-full h-14 bg-blue-600 text-white rounded-xl font-medium mt-4"
      >
        확인
      </button>
    </SelectBottomSheet>
  );
};
