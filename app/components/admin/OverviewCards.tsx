'use client';

interface Card {
  label: string;
  value: string | number;
  subtitle?: string;
  color?: 'blue' | 'green' | 'amber' | 'red';
}

interface OverviewCardsProps {
  cards: Card[];
}

export function OverviewCards({ cards }: OverviewCardsProps) {
  const colorMap = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    amber: 'bg-amber-50 border-amber-200',
    red: 'bg-red-50 border-red-200'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-lg border ${colorMap[card.color || 'blue']}`}
        >
          <p className="text-sm text-slate-600 mb-2">{card.label}</p>
          <p className="text-3xl font-bold text-slate-900">{card.value}</p>
          {card.subtitle && (
            <p className="text-xs text-slate-500 mt-2">{card.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}
