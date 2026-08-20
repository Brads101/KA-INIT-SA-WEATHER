import type { WeatherSummary } from "../types/api";
import { Card } from "./Card";

interface ItemListProps {
  items: WeatherSummary[];
  activeId: number | null;
  unit: "C" | "F";
  onSelect: (entry: WeatherSummary) => void;
  onRemove: (id: number) => void;
}

export function ItemList({
  items,
  activeId,
  unit,
  onSelect,
  onRemove,
}: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>Search a city above to start building your forecast history.</p>
      </div>
    );
  }

  return (
    <div className="grid">
      {items.map((entry) => (
        <Card
          key={entry.id}
          entry={entry}
          isActive={entry.id === activeId}
          unit={unit}
          onSelect={onSelect}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
