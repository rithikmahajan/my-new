import React from 'react';
import { Info, Edit, Trash2 } from 'lucide-react';

/**
 * NotificationItem Component
 * 
 * Renders a single notification row with input and action buttons
 * 
 * Props:
 * - value: string, notification text
 * - disabled: boolean, disables input editing
 * - onChange: function, called when input value changes
 * - onSend: function, called when Send button is clicked
 * - onEdit: function, called when Edit button is clicked
 * - onDelete: function, called when Delete button is clicked
 * - isBold: boolean, makes input text bold
 * 
 * Usage: <NotificationItem value={...} onChange={...} ... />
 */
const NotificationItem = ({
  value,
  disabled,
  onChange,
  onSend,
  onEdit,
  onDelete,
  isBold,
}) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`text-sm font-semibold text-gray-900 flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        isBold ? 'font-bold' : ''
      } ${disabled ? 'bg-gray-50' : 'bg-white'}`}
      disabled={disabled}
      placeholder="Enter notification text..."
    />
    
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button 
          className="bg-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 transition-colors"
          title="Info"
        >
          <Info size={16} className="text-white" />
        </button>
        <button
          className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
          onClick={onSend}
        >
          Send Now
        </button>
      </div>
      
      <div className="flex items-center gap-2 ml-4">
        <button
          className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Edit"
          onClick={onEdit}
        >
          <Edit size={16} />
        </button>
        <button
          className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
          title="Delete"
          onClick={onDelete}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </div>
);

export default NotificationItem;
