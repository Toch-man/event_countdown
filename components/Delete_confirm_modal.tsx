import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteConfirmModalProps {
  countdownName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function Delete_Confirm_Modal({
  countdownName,
  onConfirm,
  onClose,
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
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle
              size={32}
              className="text-red-600 dark:text-red-400"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Delete Countdown?
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to delete <strong>"{countdownName}"</strong>?
            This action cannot be undone.
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
