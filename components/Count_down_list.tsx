import Countdown_Card from "./Count_down_card";
import EmptyState from "./Empty_state";
import { Count_down } from "../lib/types";

interface CountdownListProps {
  countdowns: Count_down[];
  onEdit: (id: string, updated: Partial<Count_down>) => void;
  onDelete: (id: string) => void;
  darkMode?: boolean;
}

export default function Countdown_List({
  countdowns,
  onEdit,
  onDelete,
  darkMode = false,
}: CountdownListProps) {
  if (countdowns.length === 0) {
    return <EmptyState darkMode={darkMode} />;
  }

  const sorted = [...countdowns].sort((a, b) => {
    const date_a = new Date(a.date);
    const date_b = new Date(b.date);
    const now = new Date();

    const isPast_a = date_a < now;
    const isPast_b = date_b < now;

    if (isPast_a && !isPast_b) return 1;
    if (!isPast_a && isPast_b) return -1;

    return date_a.getTime() - date_b.getTime();
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((countdown) => (
          <Countdown_Card
            key={countdown.id}
            countdown={countdown}
            onEdit={onEdit}
            onDelete={onDelete}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
}
