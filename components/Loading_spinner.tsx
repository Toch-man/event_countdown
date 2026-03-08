export default function Loading_Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="relative">
        {/* Spinning circle */}
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      <p className="ml-4 text-gray-600 animate-pulse">Loading countdowns...</p>
    </div>
  );
}
