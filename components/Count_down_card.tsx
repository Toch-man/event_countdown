"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, Calendar } from "lucide-react";
import {
  isPast,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  formatDistanceToNow,
} from "date-fns";
import EditCountdownModal from "./Edit_countdown_modal";
import DeleteConfirmModal from "./Delete_confirm_modal";
import { Count_down, Time_Left } from "../lib/types";

interface CountdownCardProps {
  countdown: Count_down;
  onEdit: (id: string, updated: Partial<Count_down>) => void;
  onDelete: (id: string) => void;
}

export default function Countdown_Card({
  countdown,
  onEdit,
  onDelete,
}: CountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState<Time_Left | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(true);

  // Calculate time left every second
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(countdown.date);

      if (isPast(targetDate)) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        setIsCalculating(false);
        return;
      }

      const days = differenceInDays(targetDate, now);
      const hours = differenceInHours(targetDate, now) % 24;
      const minutes = differenceInMinutes(targetDate, now) % 60;
      const seconds = differenceInSeconds(targetDate, now) % 60;

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
      setIsCalculating(false);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [countdown.date]);

  // Determine urgency color
  const getUrgencyColor = (): string => {
    if (!timeLeft) return "border-gray-300 bg-gray-50";
    if (timeLeft.isPast) return "border-gray-300 bg-gray-50";
    if (timeLeft.days <= 1) return "border-red-500 bg-red-50";
    if (timeLeft.days <= 7) return "border-orange-500 bg-orange-50";
    if (timeLeft.days <= 30) return "border-yellow-500 bg-yellow-50";
    return "border-blue-500 bg-blue-50";
  };

  // Loading state
  if (isCalculating || !timeLeft) {
    return (
      <div className="border-2 border-gray-200 rounded-xl p-6 bg-white animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`border-2 rounded-xl p-6 ${getUrgencyColor()} transition-all hover:shadow-lg`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 wrap-break-words">
              {countdown.name}
            </h3>
            {countdown.description && (
              <p className="text-sm text-gray-600 wrap-break-words">
                {countdown.description}
              </p>
            )}
          </div>

          <div className="flex gap-2 ml-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-2 hover:bg-white rounded-lg transition-colors"
              aria-label="Edit countdown"
            >
              <Pencil size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 hover:bg-white rounded-lg transition-colors"
              aria-label="Delete countdown"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <Calendar size={16} />
          <span>
            {new Date(countdown.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Countdown Display */}
        {timeLeft.isPast ? (
          <div className="text-center py-4">
            <p className="text-2xl font-bold text-gray-500">Event Passed</p>
            <p className="text-sm text-gray-400 mt-1">
              {formatDistanceToNow(new Date(countdown.date), {
                addSuffix: true,
              })}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            <Time_Unit value={timeLeft.days} label="Days" />
            <Time_Unit value={timeLeft.hours} label="Hours" />
            <Time_Unit value={timeLeft.minutes} label="Mins" />
            <Time_Unit value={timeLeft.seconds} label="Secs" />
          </div>
        )}
      </motion.div>

      {/* Modals */}
      {showEditModal && (
        <EditCountdownModal
          countdown={countdown}
          onSave={(updated) => {
            onEdit(countdown.id, updated);
            setShowEditModal(false);
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          countdownName={countdown.name}
          onConfirm={() => {
            onDelete(countdown.id);
            setShowDeleteModal(false);
          }}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}

// Time unit component
interface TimeUnitProps {
  value: number;
  label: string;
}

function Time_Unit({ value, label }: TimeUnitProps) {
  return (
    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
      <div className="text-2xl font-bold text-gray-900">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs text-gray-600 mt-1">{label}</div>
    </div>
  );
}
