interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function Dialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Task",
  message = "Are you sure you want to delete this task? This action cannot be undone.",
}: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        <p className="mt-2 text-sm text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium
                       text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium
                       text-white shadow hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
