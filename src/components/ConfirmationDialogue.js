import React from 'react';

/**
 * ConfirmationDialogue Component
 * 
 * Reusable confirmation dialog with customizable message and actions
 * 
 * Props:
 * - message: string, message to display in the dialog
 * - confirmText: string, text for the confirm button
 * - cancelText: string, text for the cancel button
 * - onConfirm: function, called when confirm button is clicked
 * - onCancel: function, called when cancel button is clicked
 * - type: string, "confirmation" (default) or "success" for different layouts
 * - onDone: function, called when done button is clicked (for success type)
 * 
 * Usage: 
 * - Confirmation: <ConfirmationDialogue message="..." confirmText="..." cancelText="..." onConfirm={...} onCancel={...} />
 * - Success: <ConfirmationDialogue type="success" message="..." onDone={...} />
 */
const ConfirmationDialogue = ({
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type = 'confirmation',
  onDone,
}) => {
  // Default message if none provided
  const displayMessage =
    message ||
    (type === 'success'
      ? 'Operation completed successfully!'
      : 'Are you sure you want to proceed?');
  
  // Default button texts
  const confirmLabel = confirmText || 'Yes';
  const cancelLabel = cancelText || 'Cancel';

  // Success type layout
  if (type === 'success') {
    return (
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-lg flex justify-center items-center flex-col relative z-10">
        {/* Success message */}
        <p className="text-gray-900 text-lg font-medium text-center mb-8 leading-relaxed">
          {displayMessage}
        </p>

        {/* Done button */}
        <button
          className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={onDone}
        >
          Done
        </button>
      </div>
    );
  }

  // Default confirmation type layout
  return (
    <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-lg flex justify-center items-center flex-col relative z-10">
      {/* Confirmation message */}
      <p className="text-gray-900 text-lg font-medium text-center mb-8 leading-relaxed">
        {displayMessage}
      </p>

      {/* Action buttons */}
      <div className="flex gap-4 w-full">
        <button
          className="flex-1 bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
        <button
          className="flex-1 bg-transparent text-gray-700 py-3 px-6 rounded-full font-medium hover:bg-gray-100 transition-colors cursor-pointer border border-gray-300"
          onClick={onCancel}
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialogue;
