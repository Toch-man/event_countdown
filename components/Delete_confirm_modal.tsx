import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteConfirmModalProps {
  countdownName: string;
  onConfirm: () => void;
  onClose: () => void;
  darkMode?: boolean;
}

export default function Delete_Confirm_Modal({
  countdownName,
  onConfirm,
  onClose,
  darkMode = false,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onConfirm();
      toast.success("Countdown deleted");
      setIsDeleting(false);
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } rounded-2xl p-6 max-w-sm w-full shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              darkMode ? "bg-red-900" : "bg-red-100"
            }`}
          >
            <AlertTriangle size={32} className="text-red-600" />
          </div>

          <h2 className="text-xl font-bold mb-2">Delete Countdown?</h2>
          <p className="mb-6">{`Are you sure you want to delete "${countdownName}"? This action cannot be undone.`}</p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className={`flex-1 px-4 py-2 border rounded-lg ${
                darkMode
                  ? "border-gray-600 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
