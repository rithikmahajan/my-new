import React from 'react';
import { X } from 'lucide-react';

/**
 * EditNotificationModal Component
 * 
 * Modal for editing notification text with save/cancel functionality
 * 
 * Props:
 * - value: string, current notification text
 * - onChange: function, called when input value changes
 * - onSave: function, called when Save button is clicked
 * - onCancel: function, called when Cancel/Close button is clicked
 * - original: string, original notification text for placeholder
 * 
 * Usage: <EditNotificationModal value={...} onChange={...} onSave={...} onCancel={...} />
 */
const EditNotificationModal = ({
  value,
  onChange,
  onSave,
  onCancel,
  original,
}) => (
  <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-lg flex flex-col items-center relative z-10">
    <button
      className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
      onClick={onCancel}
      aria-label="Close"
    >
      <X size={24} />
    </button>
    
    <h2 className="text-2xl font-semibold mb-2 text-center text-gray-900">
      Edit Notification
    </h2>
    
    <div className="text-center text-base font-medium mb-6 text-gray-600">
      Original: {original}
    </div>
    
    <label className="block text-lg font-semibold mb-2 text-left w-full text-gray-900">
      Type new notification
    </label>
    
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-xl px-4 py-3 w-full mb-8 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder={original}
      autoFocus
    />
    
    <div className="flex gap-4 w-full">
      <button
        className="flex-1 bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors cursor-pointer"
        onClick={onSave}
      >
        Save
      </button>
      <button
        className="flex-1 bg-transparent text-gray-700 py-3 px-6 rounded-full font-medium hover:bg-gray-100 transition-colors cursor-pointer border border-gray-300"
        onClick={onCancel}
      >
        Go Back
      </button>
    </div>
  </div>
);

export default EditNotificationModal;
