import { Calendar } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Calendar size={48} className="text-purple-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        No countdowns yet
      </h2>

      <p className="text-gray-600 mb-8">
        Create your first countdown to start tracking your important events!
      </p>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-left">
        <p className="text-sm text-gray-700">
          <strong>💡 Tip:</strong> Add birthdays, deadlines, launches, or any
          event you're excited about!
        </p>
      </div>
    </div>
  );
}
