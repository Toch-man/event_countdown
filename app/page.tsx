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

  // Load countdowns from localStorage on mount
  useEffect(() => {
    //loading delay for smooth UX
    const timer = setTimeout(() => {
      const saved = storage.getCountdowns();
      setCountdowns(saved);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Add new countdown
  const handleAdd = (countdown: Count_down) => {
    const newCountdowns = [...countdowns, countdown];
    setCountdowns(newCountdowns);
    storage.saveCountdowns(newCountdowns);
    setShowAddModal(false);
  };

  // Edit countdown
  const handleEdit = (id: string, updatedCountdown: Partial<Count_down>) => {
    const newCountdowns = countdowns.map((c) =>
      c.id === id ? { ...c, ...updatedCountdown } : c
    );
    setCountdowns(newCountdowns);
    storage.saveCountdowns(newCountdowns);
  };

  // Delete countdown
  const handleDelete = (id: string) => {
    const newCountdowns = countdowns.filter((c) => c.id !== id);
    setCountdowns(newCountdowns);
    storage.saveCountdowns(newCountdowns);
  };

  return (
    <div className="min-h-screen bg-gradient-to from-purple-50 via-blue-50 to-pink-50 p-4 md:p-8">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Event Countdowns 
            </h1>
            <p className="text-gray-600">
              Track your important events and deadlines
            </p>
          </div>

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

      {/* Loading or Countdown List */}
      {isLoading ? (
        <Loading_Spinner />
      ) : (
        <CountdownList
          countdowns={countdowns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddCountdownModal
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
