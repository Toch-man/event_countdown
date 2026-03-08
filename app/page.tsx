"use client";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import CountdownList from "@/components/Count_down_list";
import AddCountdownModal from "@/components/Add_countdown_modal";
import Loading_Spinner from "@/components/Loading_spinner";
import { storage } from "../lib/storage";
import { Count_down } from "../lib/types";
import { Plus, Moon, Sun } from "lucide-react";

export default function Home() {
  const [countdowns, setCountdowns] = useState<Count_down[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Load countdowns & dark mode on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedCountdowns = storage.getCountdowns();
      setCountdowns(savedCountdowns);
      setIsLoading(false);
    }, 500);

    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    return () => clearTimeout(timer);
  }, []);

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
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
    <div
      className={`${
        darkMode ? "dark" : ""
      } min-h-screen p-4 md:p-8 bg-gradient-to from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}
    >
      <Toaster position="top-right" />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Event Countdowns
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your important events and deadlines
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
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

      {/* Loading or Countdown List */}
      {isLoading ? (
        <Loading_Spinner />
      ) : (
        <CountdownList
          countdowns={countdowns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          darkMode={darkMode}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddCountdownModal
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
