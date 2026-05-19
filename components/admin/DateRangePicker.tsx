'use client';

interface DateRangePickerProps {
  value: number;
  onChange: (value: number) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const ranges = [
    { label: '7 hari', value: 7 },
    { label: '30 hari', value: 30 },
    { label: '90 hari', value: 90 }
  ];

  return (
    <div className="flex gap-2 mb-6">
      {ranges.map(range => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            value === range.value
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
