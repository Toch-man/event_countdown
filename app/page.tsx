"use client";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import CountdownList from "@/components/Count_down_list";
import AddCountdownModal from "@/components/Add_countdown_modal";
import Loading_Spinner from "@/components/Loading_spinner";
import { storage } from "../lib/storage";
import { Count_down } from "../lib/types";
import { Plus } from "lucide-react";

export default function Home() {
  const [countdowns, setCountdowns] = useState<Count_down[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = storage.getCountdowns();
      setCountdowns(saved);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleAdd = (countdown: Count_down) => {
    const newCountdowns = [...countdowns, countdown];
    setCountdowns(newCountdowns);
    storage.saveCountdowns(newCountdowns);
    setShowAddModal(false);
  };

  const handleEdit = (id: string, updatedCountdown: Partial<Count_down>) => {
    const newCountdowns = countdowns.map((c) =>
      c.id === id ? { ...c, ...updatedCountdown } : c
    );
    setCountdowns(newCountdowns);
    storage.saveCountdowns(newCountdowns);
  };

  const handleDelete = (id: string) => {
    const newCountdowns = countdowns.filter((c) => c.id !== id);
    setCountdowns(newCountdowns);
    storage.saveCountdowns(newCountdowns);
  };

  return (
    <div className="min-h-screen bg-gradient-to from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-black p-4 md:p-8 transition-colors">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Event Countdowns
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your important events and deadlines
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-3 rounded-lg bg-gray-800 text-white dark:bg-white dark:text-black"
            >
              Toggle Mode
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              disabled={isLoading}
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={20} />
              New Countdown
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loading_Spinner />
      ) : (
        <CountdownList
          countdowns={countdowns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showAddModal && (
        <AddCountdownModal
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
