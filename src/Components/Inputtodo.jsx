import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:5000/todos';

const InputTodo = () => {
  const [input, setInput] = useState('');
  const [recurrenceType, setRecurrenceType] = useState('');
  const [recurrenceInterval, setRecurrenceInterval] = useState('');
  const [recurrenceDaysOfWeek, setRecurrenceDaysOfWeek] = useState('');
  const [recurrenceNthDayOfMonth, setRecurrenceNthDayOfMonth] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
      } catch (error) {
        toast.error('Failed to fetch todos!');
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const response = await axios.post(API_URL, todo);
      // Add new todo to the top of the list
      setTodos((prev) => [{ ...todo, todo_id: response.data.todo_id }, ...prev]);
      toast.success('Todo added successfully!');
    } catch (error) {
      toast.error('Failed to add todo!');
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedTodo);
      setTodos((prev) =>
        prev.map((todo) => (todo.todo_id === id ? { ...todo, ...updatedTodo } : todo))
      );
      toast.success('Todo updated successfully!');
    } catch (error) {
      toast.error('Failed to update todo!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
      toast.error('Todo deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete todo!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const newTodo = {
      description: input,
      recurrence_type: recurrenceType,
      recurrence_interval: recurrenceInterval,
      recurrence_days_of_week: recurrenceDaysOfWeek,
      recurrence_nth_day_of_month: recurrenceNthDayOfMonth,
      recurrence_start_date: startDate,
      recurrence_end_date: endDate,
    };

    if (editTodo) {
      await updateTodo(editTodo.todo_id, newTodo);
      setEditTodo(null); // Reset editTodo
    } else {
      await addTodo(newTodo);
    }

    resetForm();
  };

  const resetForm = () => {
    setInput('');
    setRecurrenceType('');
    setRecurrenceInterval('');
    setRecurrenceDaysOfWeek('');
    setRecurrenceNthDayOfMonth('');
    setStartDate('');
    setEndDate('');
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setInput(todo.description);
    setRecurrenceType(todo.recurrence_type);
    setRecurrenceInterval(todo.recurrence_interval);
    setRecurrenceDaysOfWeek(todo.recurrence_days_of_week);
    setRecurrenceNthDayOfMonth(todo.recurrence_nth_day_of_month);
    setStartDate(todo.recurrence_start_date);
    setEndDate(todo.recurrence_end_date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-600 flex flex-col items-center p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-white mb-6 text-center">To-Do Application</h1>

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded shadow-lg">
        <form onSubmit={handleSubmit} className="w-full md:w-1/3 p-4 border-r border-gray-200">
          <h2 className="text-xl font-bold mb-4">{editTodo ? 'Edit Todo' : 'Add Todo'}</h2>
          <div className="flex flex-col gap-4 mb-4">

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done?"
              className="border border-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />

            <select
              value={recurrenceType}
              onChange={(e) => setRecurrenceType(e.target.value)}
              className="border border-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
            >
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
              className="border border-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />

            <input
              type="text"
              value={recurrenceDaysOfWeek}
              onChange={(e) => setRecurrenceDaysOfWeek(e.target.value)}
              placeholder="Days of the week (e.g., Mon,Wed,Fri)"
              className="border border-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />

            <input
              type="number"
              value={recurrenceNthDayOfMonth}
              onChange={(e) => setRecurrenceNthDayOfMonth(e.target.value)}
              placeholder="Nth day of the month (e.g., 2 for second day)"
              className="border border-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-4 py-2 rounded hover:bg-gradient-to-l transition duration-200 w-full"
          >
            {editTodo ? 'Update Todo' : 'Add Todo'}
          </button>
        </form>

        <div className="w-full md:w-2/3 p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          <ul>
            {todos.length === 0 ? (
              <li className="text-center text-gray-500">No to-do list available</li>
            ) : (
              todos.map((todo) => (
                <li key={todo.todo_id} className="bg-gray-100 rounded shadow p-4 mb-2 flex flex-col">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">{todo.description}</p>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(todo)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>
                      <button onClick={() => handleDelete(todo.todo_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                    </div>
                  </div>
                  {todo.recurrence_type && (
                    <p className="text-sm text-gray-500">Recurrence: {todo.recurrence_type} (every {todo.recurrence_interval} days)</p>
                  )}
                  {todo.recurrence_days_of_week && (
                    <p className="text-sm text-gray-500">Days of Week: {todo.recurrence_days_of_week}</p>
                  )}
                  {todo.recurrence_nth_day_of_month && (
                    <p className="text-sm text-gray-500">Nth Day of Month: {todo.recurrence_nth_day_of_month}</p>
                  )}
                  <p className="text-sm text-gray-500">Start Date: {todo.recurrence_start_date || 'No Date'}</p>
                  <p className="text-sm text-gray-500">End Date: {todo.recurrence_end_date || 'No Date'}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputTodo;
