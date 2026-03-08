import { Calendar } from "lucide-react";

interface EmptyStateProps {
  darkMode?: boolean;
}

export default function EmptyState({ darkMode = false }: EmptyStateProps) {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div
        className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
          darkMode ? "bg-gray-700" : "bg-purple-100"
        }`}
      >
        <Calendar
          size={48}
          className={darkMode ? "text-purple-300" : "text-purple-600"}
        />
      </div>

      <h2
        className={`text-2xl font-bold mb-2 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        No countdowns yet
      </h2>
      <p className={darkMode ? "text-gray-300 mb-8" : "text-gray-600 mb-8"}>
        Create your first countdown to start tracking your important events!
      </p>

      <div
        className={`rounded-lg p-4 text-left ${
          darkMode
            ? "bg-gray-700 border-gray-600"
            : "bg-purple-50 border-purple-200"
        } border`}
      >
        <p
          className={
            darkMode ? "text-gray-300 text-sm" : "text-gray-700 text-sm"
          }
        >
          <strong>💡 Tip:</strong> Add birthdays, deadlines, launches, or any
          event you're excited about!
        </p>
      </div>
    </div>
  );
}
