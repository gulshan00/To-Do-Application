import React, { useEffect, useState } from 'react';

function EditModal({ isOpen, onClose, todo, onSubmit }) {
  const [input, setInput] = useState(todo ? todo.description : '');
  const [recurrenceType, setRecurrenceType] = useState(todo ? todo.recurrence_type : '');
  const [recurrenceInterval, setRecurrenceInterval] = useState(todo ? todo.recurrence_interval : 1);
  const [recurrenceDaysOfWeek, setRecurrenceDaysOfWeek] = useState(todo ? todo.recurrence_days_of_week : '');
  const [recurrenceNthDayOfMonth, setRecurrenceNthDayOfMonth] = useState(todo ? todo.recurrence_nth_day_of_month : '');
  const [startDate, setStartDate] = useState(todo ? todo.recurrence_start_date.slice(0, 10) : '');
  const [endDate, setEndDate] = useState(todo ? todo.recurrence_end_date.slice(0, 10) : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(todo.todo_id, {
        description: input,
        recurrence_type: recurrenceType,
        recurrence_interval: recurrenceInterval,
        recurrence_days_of_week: recurrenceDaysOfWeek,
        recurrence_nth_day_of_month: recurrenceNthDayOfMonth,
        recurrence_start_date: startDate,
        recurrence_end_date: endDate,
      });
      setInput('');
      onClose();
    }
  };

  useEffect(() => {
    if (todo) {
      setInput(todo.description);
      setRecurrenceType(todo.recurrence_type || '');
      setRecurrenceInterval(todo.recurrence_interval || 1);
      setRecurrenceDaysOfWeek(todo.recurrence_days_of_week || '');
      setRecurrenceNthDayOfMonth(todo.recurrence_nth_day_of_month || '');
      setStartDate(todo.recurrence_start_date.slice(0, 10) || '');
      setEndDate(todo.recurrence_end_date.slice(0, 10) || '');
    }
  }, [todo]);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg">
          <h2 className="text-lg font-bold mb-4">Edit Todo</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Edit your task"
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />
            <select value={recurrenceType} onChange={(e) => setRecurrenceType(e.target.value)} className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4">
              <option value="">No Recurrence</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <input
              type="number"
              min="1"
              value={recurrenceInterval}
              onChange={(e) => setRecurrenceInterval(e.target.value)}
              placeholder="Interval (e.g., every 2 days)"
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />
            <input
              type="text"
              value={recurrenceDaysOfWeek}
              onChange={(e) => setRecurrenceDaysOfWeek(e.target.value)}
              placeholder="Days of the week (e.g., Mon,Wed,Fri)"
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />
            <input
              type="number"
              value={recurrenceNthDayOfMonth}
              onChange={(e) => setRecurrenceNthDayOfMonth(e.target.value)}
              placeholder="Nth day of the month (e.g., 2 for second day)"
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />
            <div className="flex justify-between mt-4">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
                Update
              </button>
              <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default EditModal;
