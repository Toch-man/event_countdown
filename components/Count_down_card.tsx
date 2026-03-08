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

  const getUrgencyColor = (): string => {
    if (!timeLeft)
      return "border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700";
    if (timeLeft.isPast)
      return "border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700";
    if (timeLeft.days <= 1) return "border-red-500 bg-red-50 dark:bg-red-900";
    if (timeLeft.days <= 7)
      return "border-orange-500 bg-orange-50 dark:bg-orange-900";
    if (timeLeft.days <= 30)
      return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900";
    return "border-blue-500 bg-blue-50 dark:bg-blue-900";
  };

  if (isCalculating || !timeLeft) {
    return (
      <div className="border-2 border-gray-200 rounded-xl p-6 bg-white dark:bg-gray-800 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Calculate total seconds for progress bar
  const totalSeconds =
    differenceInSeconds(new Date(countdown.date), new Date()) +
    (timeLeft?.days || 0) * 86400 +
    (timeLeft?.hours || 0) * 3600 +
    (timeLeft?.minutes || 0) * 60 +
    (timeLeft?.seconds || 0);

  const remainingSeconds =
    (timeLeft?.days || 0) * 86400 +
    (timeLeft?.hours || 0) * 3600 +
    (timeLeft?.minutes || 0) * 60 +
    (timeLeft?.seconds || 0);

  const progressPercent =
    totalSeconds > 0 ? Math.max(0, (remainingSeconds / totalSeconds) * 100) : 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`border-2 rounded-xl p-6 ${getUrgencyColor()} transition-all hover:shadow-lg`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 wrap-break-words">
              {countdown.name}
            </h3>
            {countdown.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 wrap-break-words">
                {countdown.description}
              </p>
            )}
          </div>

          <div className="flex gap-2 ml-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Edit countdown"
            >
              <Pencil size={16} className="text-gray-600 dark:text-gray-200" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Delete countdown"
            >
              <Trash2 size={16} className="text-red-600 dark:text-red-400" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
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

        {timeLeft.isPast ? (
          <div className="text-center py-4">
            <p className="text-2xl font-bold text-gray-500 dark:text-gray-400">
              Event Passed
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              {formatDistanceToNow(new Date(countdown.date), {
                addSuffix: true,
              })}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-2 mb-3">
              <Time_Unit value={timeLeft.days} label="Days" />
              <Time_Unit value={timeLeft.hours} label="Hours" />
              <Time_Unit value={timeLeft.minutes} label="Mins" />
              <Time_Unit value={timeLeft.seconds} label="Secs" />
            </div>

            <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-purple-600 dark:bg-purple-400"
                style={{ width: `${progressPercent}%` }}
                animate={{ width: `${progressPercent}%` }}
              />
            </div>
          </>
        )}
      </motion.div>

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

interface TimeUnitProps {
  value: number;
  label: string;
}

function Time_Unit({ value, label }: TimeUnitProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
        {label}
      </div>
    </div>
  );
}
